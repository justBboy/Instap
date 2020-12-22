from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

BASE_URL = "http://instadp.com"
response = requests.get(BASE_URL)
data = response.text
soup = BeautifulSoup(data, features='html.parser')
top_instagrammers_elms = soup.find('ul', {'class': 'users-list'}).find_all('li', recursive=False)
top_instagrammers = []
for elm in top_instagrammers_elms:
    tp_dict = {'name': elm.a.text, 'link': elm.a['href']}
    top_instagrammers.append(tp_dict)

articles_elms = soup.find('ul', {'class': 'articles-list'})
articles_list = []
for a in articles_elms:
    try:
        articles_list.append({"title": a.a.find('span', {'class': 'title'}).text, "content": a.a.find('span', {'class': 'summary'}).text, "link": a.a['href'][:-5]})
    except AttributeError:
        pass

@app.route('/')
def index():
    return render_template('index.html', top_instagrammers=top_instagrammers, articles_list=articles_list)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/articles')
def articles(num, article_name):
    return render_template('articles.html')

@app.route('/article/<num>/<article_name>')
def article(num, article_name):
    ar_res = requests.get('{}/article/{}/{}.html'.format(BASE_URL, num, article_name))
    ar_data = ar_res.text
    ar_soup = BeautifulSoup(ar_data, 'html.parser')

    thumbnail = ar_soup.find('section', {'class': 'article-top'}).find('div', {'class': 'thumbnail'}) if ar_soup.find('section', {'class': 'article-top'}) else ""

    title = ar_soup.find('section', {'class': 'article-top'}).find('span', {'class': 'text'}).h1.text if ar_soup.find('section', {'class': 'article-top'}) else ""

    article_content = ar_soup.find('section', {'class': 'article-middle'}) if ar_soup.find('section', {'class': 'article-middle'}) else ""

    return render_template('article.html', thumbnail=thumbnail, title=title, article_content=article_content)


@app.route('/stories')
@app.route('/stories/<username>')
def stories(username=None):
    if username:
        st_res = requests.get("{}/stories/{}".format(BASE_URL, username))
        st_data = st_res.text
        st_soup = BeautifulSoup(st_data, 'html.parser')
        info_div = st_soup.find('div', {'class': 'info-wrapper'})

        username = info_div.find('span', {'class': 'username'}).text if info_div.find('span', {'class': 'username'}).text else ""

        call_to_action = info_div.find('div', {'class': 'call-to-action'}).text if info_div.find('div', {'class': 'call-to-action'}).text else ""

        num_of_followers = info_div.find('div', {'class': 'followers-number'}).text if info_div.find('div', {'class': 'followers-number'}).text else ""
        
        is_verified = True if st_soup.find('section', {'class': 'verified'}) else False

        user_img_style = st_soup.find('section', {'class': 'result-account'}).a['style']

        story_video = st_soup.find('div', {'class': 'story-post'}).video if st_soup.find('div', {'class': 'story-post'}) else ""
        story_highlights_cont = st_soup.find('ul', {'class': 'story-highlights'})
        story_highlights = []
        for s in story_highlights_cont:
            try:
                story_highlights.append({'title': s.a.text, 'link': s.a['href'], 'bg_style': s.div['style']})
            except AttributeError:
                pass
        return render_template('story.html', username=username, call_to_action=call_to_action, num_of_followers=num_of_followers, is_verified=is_verified, user_img_style=user_img_style, story_highlights=story_highlights, story_video=story_video)

    return render_template('stories.html', top_instagrammers=top_instagrammers, articles_list=articles_list)

@app.route('/reels')
@app.route('/reels/<username>')
def reels(username=None):
    if username:
        re_res = requests.get("{}/reels/{}".format(BASE_URL, username))
        re_data = re_res.text
        re_soup = BeautifulSoup(re_data, 'html.parser')
        info_div = re_soup.find('div', {'class': 'info-wrapper'})

        username = info_div.find('span', {'class': 'username'}).text if info_div.find('span', {'class': 'username'}).text else ""

        call_to_action = info_div.find('div', {'class': 'call-to-action'}).text if info_div.find('div', {'class': 'call-to-action'}).text else ""

        num_of_followers = info_div.find('div', {'class': 'followers-number'}).text if info_div.find('div', {'class': 'followers-number'}).text else ""
        
        is_verified = True if re_soup.find('section', {'class': 'verified'}) else False

        user_img_style = re_soup.find('section', {'class': 'result-account'}).a['style']

        reels_result = re_soup.find('div', {'class', 'result-private'}).text if re_soup.find('div', {'class', 'result-private'}).text else "There are no reels of this user"  
        return render_template('reel.html', username=username, call_to_action=call_to_action, num_of_followers=num_of_followers, is_verified=is_verified, user_img_style=user_img_style, reels_result=reels_result)


    return render_template('reels.html', top_instagrammers=top_instagrammers, articles_list=articles_list)

@app.route('/profile/<username>')
def profile(username):
    p_res = requests.get('{}/profile/{}'.format(BASE_URL, username))
    p_data = p_res.text
    p_soup = BeautifulSoup(p_data, 'html.parser')
    info_div = p_soup.find('div', {'class': 'info-wrapper'})

    username = info_div.find('span', {'class': 'username'}).text if info_div.find('span', {'class': 'username'}).text else ""

    call_to_action = info_div.find('div', {'class': 'call-to-action'}).text if info_div.find('div', {'class': 'call-to-action'}).text else ""

    num_of_followers = info_div.find('div', {'class': 'followers-number'}).text if info_div.find('div', {'class': 'followers-number'}).text else ""
    
    is_verified = True if p_soup.find('section', {'class': 'verified'}) else False

    user_img_style = p_soup.find('section', {'class': 'result-account'}).a['style']

    return render_template('profile.html', username=username, call_to_action=call_to_action, num_of_followers=num_of_followers, is_verified=is_verified, user_img_style=user_img_style)

@app.route('/fullsize/<username>')
def fullsize(username):
    fs_res = requests.get("{}/fullsize/{}".format(BASE_URL, username))
    fs_data = fs_res.text
    fs_soup = BeautifulSoup(fs_data, 'html.parser')
    info_div = fs_soup.find('div', {'class': 'info-wrapper'})

    username = info_div.find('span', {'class': 'username'}).text if info_div.find('span', {'class': 'username'}).text else ""

    call_to_action = info_div.find('div', {'class': 'call-to-action'}).text if info_div.find('div', {'class': 'call-to-action'}).text else ""

    num_of_followers = info_div.find('div', {'class': 'followers-number'}).text if info_div.find('div', {'class': 'followers-number'}).text else ""
    
    is_verified = True if fs_soup.find('section', {'class': 'verified'}) else False

    user_img_style = fs_soup.find('section', {'class': 'result-account'}).a['style']

    huge_img = fs_soup.find('a', {'class': 'instadp-post'}).img['src'] if fs_soup.find('a', {'instadp-post'}).img else ""

    download_btn_href = fs_soup.find('a', {'class': 'download-btn'})['href']

    return render_template('fullsize.html', username=username, call_to_action=call_to_action, num_of_followers=num_of_followers, is_verified=is_verified, user_img_style=user_img_style, huge_img=huge_img, download_btn_href=download_btn_href)