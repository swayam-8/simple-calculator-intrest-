#!/usr/bin/env bash
# Calculate simple interest using a principal, annual percentage rate, and years.
set -euo pipefail
export LC_ALL=C

read_value() {
    local prompt="$1" value
    if ! read -r -p "$prompt" value; then
        printf 'Error: expected principal, annual rate, and time in years.\n' >&2
        return 1
    fi
    printf '%s' "$value"
}

printf 'Simple Interest Calculator\n'
principal=$(read_value 'Enter principal amount: ')
rate=$(read_value 'Enter annual rate of interest (%): ')
time=$(read_value 'Enter time period in years: ')

awk -v p="$principal" -v r="$rate" -v t="$time" 'BEGIN {
    number = "^[0-9]+([.][0-9]+)?$|^[.][0-9]+$"
    if (p !~ number || r !~ number || t !~ number || p <= 0 || p > 1e12 || r < 0 || r > 1000 || t <= 0 || t > 10000) {
        print "Error: principal must be > 0 and <= 1000000000000; annual rate 0–1000%; time > 0 and <= 10000 years. Use decimal numbers." > "/dev/stderr"
        exit 1
    }
    interest = p * r * t / 100
    printf "Principal: %.2f\nAnnual rate: %.2f%%\nTime (years): %.2f\nSimple interest: %.2f\nTotal amount: %.2f\n", p, r, t, interest, p + interest
}'
