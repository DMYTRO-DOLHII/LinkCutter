package main

import "fmt"

type Storage struct {
	storage map[string]string
}

func (storage *Storage) put(key string, value string) {
	storage.storage[key] = value
}

func (storage *Storage) findURL(key string) string {
	for k, v := range storage.storage {
		if k == key {
			return v
		}
	}

	return ""

}

func (storage *Storage) exist(url string) bool {
	for k, _ := range storage.storage {
		if storage.storage[k] == url {
			return true
		}
	}

	return false
}

func (storage *Storage) printStorage() {
	fmt.Println(storage)
}
