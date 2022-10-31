package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"
)

var tmpl *template.Template

var storage = Storage{storage: make(map[string]string)}

func init() {
	tmpl = template.Must(template.ParseGlob("templates/*.html"))
}

func entry(w http.ResponseWriter, r *http.Request) {

	err := tmpl.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		return
	}

	if r.Method == "GET" {
		// TODO Find a way to delete particular substring @Dmytro-Dolhii
		path := strings.TrimLeft(strings.TrimRight(r.URL.Path, "/favicon.ico"), "/")

		//fmt.Printf("Path is : " + path + "\n")

		if path == "" {
			return
		} else {
			if storage.exist(path) {
				fmt.Println("Finding...")
				w.Header().Set("Content-Type", "application/json")
				url := storage.findURL(path)
				w.Write([]byte(url))
				fmt.Printf("Found %s\n", url)
			} else {
				return
			}
		}
	}

	if r.Method == "POST" {
		r.ParseForm()

		if r.Form.Get("url") != "" {

			if storage.exist(r.Form.Get("url")) {
				// TODO Send null or smth like that if url already exists
				return
			}

			gen := generate()

			storage.put(gen, r.Form.Get("url"))

			w.Header().Set("Content-Type", "application/json")

			w.Write([]byte(gen))
		} else {
			log.Printf("There is not such a parameter...")
		}
	}

}

func main() {
	fileServer := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets", fileServer))
	http.HandleFunc("/", entry)
	log.Fatal(http.ListenAndServe(":8081", nil))
}
