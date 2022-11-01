package main

import (
	"html/template"
	"log"
	"net/http"
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
		} else if r.Form.Get("phrase") != "" {
			path := r.Form.Get("phrase")

			if storage.exist(path) {
				w.Header().Set("Content-Type", "application/json")
				url := storage.findURL(path)
				w.Write([]byte(url))
			} else {
				return
			}
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
