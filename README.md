# Xmeme
**XMEME** is a full stack web application to pull created memes using their URL and listing them on the page with the user’s name and caption.

## :fire: Features

1. Users will post Memes by providing these inputs :
   * Name of the person posting the meme
   * Caption for the Meme
   * URL of the Meme image
   
2. Users will view the latest 100 memes posted.

3. User can update the Caption and URL of the memes.
4. User can also delete the memes.
5. Swagger-UI for API Documentation.

# Frontend 
### Frontend Technologies used:
- HTML
- CSS
- Javascript

# Backend

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/14143990/TWDRtfoy)
[![View in Swagger](http://jessemillar.github.io/view-in-swagger-button/button.svg)](https://rudrakshi-xmeme.herokuapp.com/swagger-ui/)
### Backend Technologies used:
- Django
- Django Rest Framework
- Heroku
- Sqllite3

<details>
  <summary><strong>Backend Setup Instructions</strong></summary>

- Fork and Clone the repo using
```
git clone https://github.com/rudrakshi99/Xmeme.git
cd backend
```
- Install dependencies using
```
pip3 install -r requirements.txt
```
- Make migrations using
```
python3 manage.py makemigrations
```
- Migrate Database
```
python3 manage.py migrate
```
- Create a superuser
```
python3 manage.py createsuperuser
```
- Run server using
```
python3 manage.py runserver
```
</details>

### Important Links :
* **Publicly Deployed Link :** https://rudrakshi-xmeme.herokuapp.com/memes/
* **End-Point :** /memes

# License :memo:

This project follows the [MIT License](https://choosealicense.com/licenses/mit/).

## If you liked the project don't forget to star 🌟 and fork 🍽 the project.

<h2 align="center">Made with ❤ by Rudrakshi</h2>

[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
