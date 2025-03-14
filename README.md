# Comment System Setup Guide

This is the instruction to set up comment system project.

## 1. Install Required Packages
To get started, you will need to install the required Python packages for the backend. Run the following command in the root directory of the project:

```bash
pip install -r requirements.txt
```

## 2. Set Up PostgreSQL
### (1) Start PostgreSQL Service

If you're using Homebrew, you can start PostgreSQL with the following command:

```bash
brew services start postgresql
```

Otherwise, follow the instructions for your system to start PostgreSQL. For example, on Linux, you can use:

```bash
sudo service postgresql start
```

### (2) Create PostgreSQL User and Database

Once PostgreSQL is running, open the PostgreSQL command line:

```bash
psql postgres
```

Then, create a new PostgreSQL user and assign necessary privileges:

```bash
CREATE ROLE comment_user WITH LOGIN PASSWORD 'comment_password';
ALTER ROLE comment_user WITH SUPERUSER;
CREATE DATABASE comments_db;
GRANT ALL PRIVILEGES ON DATABASE comments_db TO comment_user;
```

## 3. Import Existing Data
To import the existing comments data into the database, run the following command:

```bash
python3 import_comments.py
```

This will populate the comments_db with the given data.

## 4. Run the Backend
Now that the database is set up and data is imported, navigate to the backend project directory and run the backend server using following command:

```bash
python manage.py runserver
```

The backend server should now be running at http://localhost:8000/api/comments/.

## 5. Run the Frontend
Next, navigate to the frontend project directory and start the frontend application with the following command:

```bash
npm start
```

The frontend should now be accessible at http://localhost:3000.










