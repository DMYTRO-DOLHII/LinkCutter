package main

import (
	"math/rand"
	"time"
)

var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func generate() string {
	rand.Seed(time.Now().UnixNano())

	var result string

	for i := 0; i < 10; i++ {
		result += string(letters[rand.Intn(len(letters)-1)])
	}

	return result
}
