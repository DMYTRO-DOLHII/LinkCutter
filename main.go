package main

import (
	"html/template"
	"log"
	"net/http"
)

var tmpl *template.Template

func init() {
	tmpl = template.Must(template.ParseGlob("templates/*.html"))
}

func start(w http.ResponseWriter, r *http.Request) {

	err := tmpl.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		return
	}
}

func main() {
	fileServer := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets", fileServer))
	http.HandleFunc("/", start)
	log.Fatal(http.ListenAndServe(":8081", nil))

}
