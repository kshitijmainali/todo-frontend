#!/bin/bash

env_file=".env"
required_variables=("VITE_MULTISIG_CONTRACT" "VITE_SERVER_URL" "VITE_USDT_CONTRACT")

# Check if .env file exists
if [ -f "$env_file" ]; then
    echo ".env file exists."

    # Check if required variables are defined in .env
    missing_variables=()
    for var in "${required_variables[@]}"; do
        if grep -qE "^$var=" "$env_file"; then
            echo "$var is defined in .env."
        else
            echo "$var is not defined in .env."
            missing_variables+=("$var")
        fi
    done

    # Prompt user for missing variables and add them to .env
    if [ ${#missing_variables[@]} -eq 0 ]; then
        echo "All required variables are defined."
    else
        echo "Missing variables: ${missing_variables[*]}"
        for var in "${missing_variables[@]}"; do
            read -p "Enter $var value: " value
            echo "$var=\"$value\"" >> "$env_file"
        done
        echo "Missing variables have been added to .env."
    fi
else
    echo ".env file does not exist. Creating .env file..."

    # Prompt the user for values and store them in .env
    for var in "${required_variables[@]}"; do
        read -p "Enter $var value: " value
        echo "$var=\"$value\"" >> "$env_file"
    done

    echo ".env file has been created with the specified values."
fi

