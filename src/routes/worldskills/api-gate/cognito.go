package main

import (
	"context"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/coreos/go-oidc"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/oauth2"
)

type ClaimsPage struct {
	AccessToken string
	Claims      jwt.MapClaims
}

var (
	clientID     = os.Getenv("CLIENT_ID")
	clientSecret = os.Getenv("CLIENT_SECRET")
	redirectURL  = "http://localhost:3000/callback"
	issuerURL    = os.Getenv("ISSUER_URL") // e.g. "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6ctiJCnfj"
	provider     *oidc.Provider
	oauth2Config oauth2.Config
)

func init() {
	var err error
	provider, err = oidc.NewProvider(context.Background(), issuerURL)
	if err != nil {
		log.Fatalf("Failed to create OIDC provider: %v", err)
	}

	oauth2Config = oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "phone", "openid", "email", "lmss/lutsch"},
	}
}

func main() {
	http.HandleFunc("/", handleHome)
	http.HandleFunc("/login", handleLogin)
	http.HandleFunc("/logout", handleLogout)
	http.HandleFunc("/callback", handleCallback)

	fmt.Println("Server is running on http://localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	html := `
        <html>
        <body>
            <h1>Welcome to Cognito OIDC Go App</h1>
            <a href="/login">Login with Cognito</a>
        </body>
        </html>`
	fmt.Fprint(w, html)
}

func handleLogin(writer http.ResponseWriter, request *http.Request) {
	state := "state"
	url := oauth2Config.AuthCodeURL(state, oauth2.AccessTypeOffline)
	http.Redirect(writer, request, url, http.StatusFound)
}

func handleCallback(writer http.ResponseWriter, request *http.Request) {
	ctx := context.Background()
	code := request.URL.Query().Get("code")

	rawToken, err := oauth2Config.Exchange(ctx, code)
	if err != nil {
		http.Error(writer, "Failed to exchange token: "+err.Error(), http.StatusInternalServerError)
		return
	}
	tokenString := rawToken.AccessToken

	token, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
	if err != nil {
		fmt.Printf("Error parsing token: %v\n", err)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		http.Error(writer, "Invalid claims", http.StatusBadRequest)
		return
	}

	pageData := ClaimsPage{
		AccessToken: tokenString,
		Claims:      claims,
	}

	tmpl := `
    <html>
        <body>
            <h1>User Information</h1>
            <h1>JWT Claims</h1>
            <p><strong>Access Token:</strong> {{.AccessToken}}</p>
            <ul>
                {{range $key, $value := .Claims}}
                    <li><strong>{{$key}}:</strong> {{$value}}</li>
                {{end}}
            </ul>
            <a href="/logout">Logout</a>
        </body>
    </html>`

	t := template.Must(template.New("claims").Parse(tmpl))
	t.Execute(writer, pageData)
}

func handleLogout(writer http.ResponseWriter, request *http.Request) {
	http.Redirect(writer, request, "/", http.StatusFound)
}
