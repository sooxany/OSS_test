import requests
from bs4 import BeautifulSoup
import openai
import tiktoken
import time
import os
import json
import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


# OpenAI API 설정
openai.api_key = OPENAI_API_KEY
enc = tiktoken.encoding_for_model("gpt-3.5-turbo")

# 캐시 파일 경로
CACHE_FILE = "news_summary_cache.json"

# 캐시 로드
if os.path.exists(CACHE_FILE):
    with open(CACHE_FILE, "r") as file:
        summary_cache = json.load(file)
else:
    summary_cache = {}

# 관심 있는 언론사 목록
target_press = [
    "경향신문", "국민일보", "내일신문", "동아일보", "문화일보", "서울신문",
    "조선일보", "중앙일보", "한겨레", "한국일보",
    "KBS", "MBC", "SBS", "YTN"
]

# 뉴스 요약 함수
def summarize_content(content):
    tokens = len(enc.encode(content))
    if tokens > 3800 or tokens < 300:
        return "요약할 수 없습니다."

    # 캐시 확인
    if content in summary_cache:
        return summary_cache[content]

    for _ in range(3):  # 최대 3회 재시도
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "당신은 뉴스 요약 전문가이다. 다음 뉴스를 한국어로 120token 이내로 요약하라. 문장은 반드시 완전한 형식으로 끝낸다."},
                    {"role": "user", "content": content}
                ],
                max_tokens=120,
                temperature=0.5
            )
            summary = response['choices'][0]['message']['content'].strip()
            summary_cache[content] = summary

            # 캐시 저장
            with open(CACHE_FILE, "w") as file:
                json.dump(summary_cache, file)

            return summary
        except openai.error.RateLimitError:
            print("RateLimitError 발생! 10초 대기 후 재시도...")
            time.sleep(10)
        except Exception as e:
            return f"요약 실패: {e}"

    return "요약 실패: 요청 제한 초과"

# 뉴스 데이터 수집
def fetch_news():
    url = "https://news.naver.com/main/ranking/popularDay.naver?mid=etc&sid1=111"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    ranking_boxes = soup.find_all("div", class_="rankingnews_box")
    news_data = []

    for box in ranking_boxes:
        press_name = box.find("strong", class_="rankingnews_name").get_text()
        if press_name in target_press:
            top_news = box.find("li", {"class": None})
            if top_news:
                title = top_news.find("a", class_="list_title").get_text()
                link = top_news.find("a", class_="list_title")["href"]

                # 뉴스 상세 내용 크롤링
                news_page = requests.get(link, headers=headers)
                news_soup = BeautifulSoup(news_page.text, 'html.parser')
                article = news_soup.find("div", class_="newsct_article")
                content = article.get_text(strip=True) if article else "내용 없음"

                # 요약 생성
                summary = summarize_content(content)
                news_data.append({
                    "press_name": press_name,
                    "title": title,
                    "link": link,
                    "summary": summary
                })
                # time.sleep(1)  # 요청 간 지연

    return news_data

# 결과 출력
def display_news(news_data):
    for news in news_data:
        print(f"[{news['press_name']}]")
        print(f"제목: {news['title']}")
        print(f"링크: {news['link']}")
        print(f"요약: {news['summary']}")
        print()

if __name__ == "__main__":
    news_data = fetch_news()
    display_news(news_data)
