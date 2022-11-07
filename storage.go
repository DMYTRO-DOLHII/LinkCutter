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

func (storage *Storage) getKey(url string) string {
	for k, v := range storage.storage {
		if v == url {
			return k
		}
	}

	return ""
}

func (storage *Storage) existURL(url string) bool {
	for _, v := range storage.storage {
		if v == url {
			return true
		}
	}

	return false
}

func (storage *Storage) existKey(key string) bool {
	for k, _ := range storage.storage {
		if k == key {
			return true
		}
	}

	return false
}

func (storage *Storage) printStorage() {
	fmt.Println(storage)
}
