package main

type Storage struct {
	storage map[string]string
}

func put(storage *Storage, key string, value string) {
	storage.storage[key] = value
}

func findURL(storage *Storage, key string) string {
	for k, v := range storage.storage {
		if k == key {
			return v
		}
	}

	return ""
}
