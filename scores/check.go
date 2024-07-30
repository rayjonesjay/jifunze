package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) == 6 {
		a, err := strconv.Atoi(os.Args[1])
		if err != nil {
			return
		}
		b, err := strconv.Atoi(os.Args[3])
		if err != nil {
			return
		}
		expectedResult, err := strconv.Atoi(os.Args[5])
		if err != nil {
			return
		}

		operator := os.Args[2]
		var result int
		var valid bool

		switch operator {
		case "+":
			result = a + b
			valid = (result > a) == (b > 0)

		case "-":
			result = a - b
			valid = (result < a) == (b > 0)

		case "*":
			result = a * b
			valid = (a == 0 || (result/a == b))

		case "/":
			if b == 0 {
				fmt.Println("No division by 0")
				return
			}
			result = a / b
			valid = true

		case "%":
			if b == 0 {
				fmt.Println("No modulo by 0")
				return
			}
			result = a % b
			valid = true

		default:
			fmt.Println("Invalid operator")
			return
		}

		if valid {
			if result == expectedResult {
				fmt.Println(result)
			} else {
				fmt.Println(false)
			}
		}
	}
}
