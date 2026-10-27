"""Exercise the actual Bash calculator, including invalid input and EOF."""
from pathlib import Path
import subprocess
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'simple-interest.sh'

class CalculatorTests(unittest.TestCase):
    def run_calculator(self, values):
        return subprocess.run(['bash', str(SCRIPT)], input=values, text=True, capture_output=True)

    def test_standard_calculation(self):
        result = self.run_calculator('10000\n5\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('Simple interest: 1500.00', result.stdout)
        self.assertIn('Total amount: 11500.00', result.stdout)

    def test_fractional_and_zero_rate(self):
        for values, expected in [('1000\n10\n1.5\n', '150.00'), ('1000\n0\n1\n', '0.00')]:
            with self.subTest(values=values):
                result = self.run_calculator(values)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertIn('Simple interest: ' + expected, result.stdout)

    def test_invalid_inputs_fail(self):
        for values in ['abc\n5\n1\n', '-1\n5\n1\n', '0\n5\n1\n', '100\n-5\n1\n', '100\n5\n0\n', '100\n5\n\n', '100\n1001\n1\n']:
            with self.subTest(values=values):
                result = self.run_calculator(values)
                self.assertNotEqual(result.returncode, 0)
                self.assertIn('Error:', result.stderr)

    def test_missing_input_fails(self):
        self.assertNotEqual(self.run_calculator('100\n').returncode, 0)

if __name__ == '__main__':
    unittest.main()
