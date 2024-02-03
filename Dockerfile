# get the latest node image
FROM node:latest

# Adding new group and user with permissions to run the app
RUN addgroup app && adduser -S -G app app

# set the user to run the app
USER app
# Create app directory
WORKDIR /app
# Copy package(any name).json  to working directory
COPY package*.json ./

# Change the owner of the app directory to the app user
USER root
RUN chowm -R app:app /app

# change the user back to the app user
USER app
# Install app dependencies 
RUN yarn install 
# copy all the files from the current directory to the container
copy . .
# expose port 5000 to tell Docker that the container listens on the specified network ports at runtime
EXPOSE 5000
# command to run the app
CMD yarn run dev
