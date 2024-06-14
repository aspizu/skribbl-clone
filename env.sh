#!/bin/bash

# Function to extract port number from URL
extract_port() {
    local url=$1
    local port=$(echo $url | sed 's/.*://;s/[^0-9]//g')
    echo "$port"
}

# Function to extract hostname from URL
extract_hostname() {
    local url=$1
    local hostname=$(echo $url | sed 's/.*\/\/\([^:\/]*\).*/\1/')
    echo "$hostname"
}

export VITE_BACKEND_HOSTNAME=$(extract_hostname $VITE_BACKEND)
export VITE_BACKEND_PORT=$(extract_port $VITE_BACKEND)
export FRONTEND_HOSTNAME=$(extract_hostname $FRONTEND)
export FRONTEND_PORT=$(extract_port $FRONTEND)
