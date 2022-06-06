![bg](https://raw.githubusercontent.com/Ann-T-George/tinkerhub_co_coder/main/pics/bg.png)

##  NOTE
I am trying to redesign the whole ui of app i have a figma [Design](https://www.figma.com/file/LonS17mYEGQilnNEL2btyv/DiaryApp?node-id=0%3A1) if you want to contribrute please go through the figma design



# **Diary Cocoder backend**

The Backend of project was built using Node js Express js and Few other npm packeges

### Features

- protected Routing and rest api
- Authentciation
- well managed and secured code

[Code Explanation + Demo](https://www.loom.com/share/13db4ac724dc4180a3177cb1a72a9c6b)

## How it Works ?

1. we have used bcrypt npm package to hash the password

2. uses mongodb as a database to store the user diary recieved from clientside

3. uses cookies to store user info

4. We have used multiple npm packages you can find the package info in package.json file in root folder
   eg - bcrypt,jsonwebtoken,express js,bodyparser etc..

## How to configure

Step 1:

```
git clone  hhttps://github.com/sreehari2003/Diary-cocoder-Backend

```

Step 2: (Do install the latest [Node](https://nodejs.dev/) version in your PC/Laptop then)

```
npm --v
```

## How to Run

## how to work in development ?

   <p>To Run this nodejs server in localhost you need to connect with your own mongodb database</p> 
<h3> .env file info  </h3>
<table>
 <tr>
  <th>index</th>
  <th>Name</th>
  <th>example</th>
 </tr>
 <tr>
     <td>1</td>
     <td>USERNAME</td>
     <td>"Your name"</td>
 </tr>
 <tr>
     <td>2</td>
     <td>PASSWORD</td>
     <td>"Your db password"</td>
 </tr>
 <tr>
     <td>3</td>
     <td>DATABASE</td>
     <td>"db string"</td>
 </tr>
 <tr>
     <td>4</td>
     <td>NODE_ENV</td>
     <td>DEVELOPMENT</td>
 </tr>
 <tr>
     <td>5</td>
     <td>JWT_SECRET</td>
     <td>"some text"</td>
 </tr>
 <tr>
     <td>6</td>
     <td>JWT_EXPIRES_IN</td>
     <td>90d</td>
 </tr>
</table>

<h4>to run after config file setup run</h4>
<code>npm run dev</code>

## routes

signup : POST

```
/api/auth/signup
```

Login : POST

```
/api/auth/login
```

## Protected Routes

getAllDiary : GET

```
/api/diary/:id
```

CreateDiary : POST

```
/api/diary/:id
```

DeleteDiary : DELETE

```
/api/diary/:id
```
