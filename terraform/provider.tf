# Taken from https://firebase.google.com/docs/projects/terraform/get-started

terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

provider "google-beta" {
  user_project_override       = true
  impersonate_service_account = "firebase-adminsdk-fbsvc@nimbus-tarot-journal.iam.gserviceaccount.com"
}

provider "google-beta" {
  alias                       = "no_user_project_override"
  user_project_override       = false
  impersonate_service_account = "firebase-adminsdk-fbsvc@nimbus-tarot-journal.iam.gserviceaccount.com"
}
