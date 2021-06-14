# Top builds for mythic keys in World of Warcraft

[![Build Status](https://travis-ci.com/poalrom/top-builds.svg?branch=master)](https://travis-ci.com/poalrom/top-builds)

## What is it?

This is a static website with precached data that shows what build is used by the top 30 characters of selected class and specialization. Data recache every day so you can see the fresh ratings!

## Zero-cost service without ads

Works using free services: 
- Hosted on GitHub Pages
- Caching data every day using Travis CI
- Using public API of raider.io and battle.net

## Who are uses this?

- Casual WoW players to get free recommendations, built by a heartless machine
- New players who want to know what items should be farmed right now
- Pro players who don't know why they not in the top of they roles

## What's inside?

- NodeJS + TypeScript for cron job that cache data
- GotJS - a library for making HTTP requests
- dotenv - a library that load env variables and secrets
- parcel-bundler - zero-configurable bundler
- VueJS - a frontend framework for render interface
- Petal.less - a UI library with common components
- @websanova/vue-store for storing global frontend data

## How it works?

### Caching
- Each day TravisCI runs cron job
- Inside the job a script download top characters from raider.io
- Each character validates in battle.net armory API that he used right specialization and has the full gear (sometimes players add new gear without enchants or gems, those builds are not representative)
- If character passed due validation, script save character's data to a JSON file
- All JSON files stores in a `public` directory of gh-pages branch, that published to a GitHub Pages

### UI
- VueJS loads a JSON file for selected spec and class
- All data separated to tabs like "Items", "Talents" and so on
- User can see how many of top30 characters use a spell by hover it's icon
- Most tabs have a "Usage Frequency summary" block that shows statistics about the current tab

## How to run this project locally?

- Create a developer account on https://develop.battle.net/
- Create new battle.net OAuth client on https://develop.battle.net/access/clients
- Clone this repository
- Install `NodeJS v16` or run `nvm i` if you have nvm
- Install dependencies using `npm i`
- Build code using `npm run build`
- Copy `.env.example` file to `.env`
- Fill `.env` file with your tokens
- Set a range of class-spec pairs in `.env` file that you want to cache. Full cache requires 10-15 minutes to build
- Cache data using `npm run cache`
- Run internal web-server with `npm start`
- Set class-spec pair, that you cached before, in select on top of page
- See statistics...
- Profit!