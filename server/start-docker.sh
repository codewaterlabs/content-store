#!/bin/bash
docker-machine start dev
eval "$(docker-machine env dev)"
docker-compose up -d
