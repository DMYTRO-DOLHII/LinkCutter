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
		get := strings.ReplaceAll(r.URL.Path, "/favicon.ico", "")
		get = strings.ReplaceAll(get, "/", "")

		url := findURL(&storage, get)
		fmt.Println(url)
	}

	if r.Method == "POST" {
		r.ParseForm()

		if r.Form.Get("url") != "" {
			gen := generate()
			put(&storage, gen, r.Form.Get("url"))
			printStorage(&storage)
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
