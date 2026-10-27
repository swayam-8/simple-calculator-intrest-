# Simple Interest Calculator

A final project for Introduction to Git and GitHub. Calculates simple interest from a principal amount, annual interest rate, and time period. Includes the required interactive Bash script and an optional web interface.

A responsive, dependency-free calculator for simple interest, with INR, USD, EUR, and GBP formatting and time periods in years or months. Currency selection changes the denomination; it does not convert exchange rates. Includes a reset button, calculation breakdown, keyboard submission, accessible validation errors, and an indicator when edited inputs need recalculation. Supports positive principal amounts up to ₹1 trillion, annual rates from 0–1000%, and time periods up to 10,000 years or months.

## Run

From this directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open `index.html` through the server in a browser. You can also open the file directly. No package installation, credentials, external assets, or build step are required.

## Validate

```sh
node --test calculator.test.js
```

Interest = principal × (annual rate / 100) × years. Month durations are divided by 12. Calculations use JavaScript floating-point arithmetic and displayed amounts are rounded to two decimal places. Estimates exclude fees and taxes.

## Required Bash calculator

Run on Linux or macOS with Bash and awk installed (Windows users can use WSL):

```sh
bash simple-interest.sh
```

Enter principal, annual percentage rate, and time in years when prompted.
For example, principal `10000`, rate `5`, and time `3` produce simple interest `1500.00` and total amount `11500.00`.

Automated validation:

```sh
bash -n simple-interest.sh
python3 -m unittest discover -s tests
node --test calculator.test.js
```

## Community and license

- [Apache License 2.0](LICENSE)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing](CONTRIBUTING.md)
- [Assignment submission checklist](SUBMISSION.md)
