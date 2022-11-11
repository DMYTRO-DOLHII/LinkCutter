package main

import (
	"fmt"
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
}

func goTo(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		r.ParseForm()

		if r.Form.Get("phrase") != "" {
			path := r.Form.Get("phrase")

			if storage.existKey(path) {
				w.Header().Set("Content-Type", "application/json")
				w.Write([]byte(storage.findURL(path)))
			} else {
				w.Write([]byte(""))
				return
			}
		}
	}
}

func cut(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		r.ParseForm()

		if storage.existURL(r.Form.Get("url")) {
			w.Write([]byte(storage.getKey(r.Form.Get("url"))))
			return
		}

		gen := generate()
		storage.put(gen, r.Form.Get("url"))

		fmt.Printf("%s : %d", gen, r.Form.Get("url"))

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(gen))
	}
}

func set(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		r.ParseForm()

		if storage.existURL(r.Form.Get("url")) {
			w.Write([]byte(""))
			return
		}

		storage.put(r.Form.Get("name"), r.Form.Get("url"))
		w.Write([]byte(r.Form.Get("name")))
	}
}

func del(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		r.ParseForm()

		if r.Form.Get("string") != "" {
			if storage.existURL(r.Form.Get("string")) {
				delete(storage.storage, storage.getKey(r.Form.Get("string")))
			} else if storage.existKey("string") {
				delete(storage.storage, r.Form.Get("string"))
			} else {
				w.Write([]byte(""))
				return
			}
		} else {
			w.Write([]byte(""))
			return
		}
	}
}

func main() {
	fileServer := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets", fileServer))
	http.HandleFunc("/", entry)
	http.HandleFunc("/goto", goTo)
	http.HandleFunc("/cut", cut)
	http.HandleFunc("/set", set)
	http.HandleFunc("/delete", del)
	log.Fatal(http.ListenAndServe(":8081", nil))
}
