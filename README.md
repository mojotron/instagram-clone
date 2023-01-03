# Instagram Clone

This project is capstone frontend path of The Odin Project Curriculum.

## Assignment

Replicate your favorite website as close as possible - Pinterest, Facebook, Twitter, etc. Just make sure it has lots of interesting functionality. You’ll be integrating a full array of skills into this one. If you have completed a backend course, you may use that for this project, otherwise use Firebase. This should prove that you now have all the tools and knowledge needed to build a website, just like the ones you use every day.

## Goal of the project

I decided to replicate instagram, because its looked as biggest challenge to take. My goal is to replicate all core features involving images. Features with videos are not included because this is learning project and free Firebase plan has only 5GB storage. Features that are of the marketing or commercial nature, are skipped.

### Technologies used to build this project

1. React (functional)
2. Firebase
3. Custom CSS
4. Vanilla JS

### Firebase data structure

## Features build

To recreate Instagram project is separated in building block than create a finish product. Building block are:

### Firebase Authentication

Authentication is build of four major parts parts,

1. useSignup hook - checks if username is already taken (using useCheckUsername hook). If username not exist create new user. First create user with email and address, use firebase auth object to create user document. Next create notification document and create public_usernames document to register username. Finally change AuthContext state to login user.
2. useLogin hook - check if user exist and login him/her or display message that user do not exist.
3. useLogout hook - logout user and change AuthContext state to display login page instead of user dashboard.
4. AuthContext - useReduce hook to keep track if user is logged in.

### User Settings
