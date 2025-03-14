# Taken from https://firebase.google.com/docs/projects/terraform/get-started

data "google_project" "default" {
  project_id = var.project_id
}


resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project  = data.google_project.default.project_id
  for_each = toset([
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    "serviceusage.googleapis.com",
  ])
  service = each.key

  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = data.google_project.default.project_id

  # Waits for the required APIs to be enabled.
  depends_on = [
    google_project_service.default
  ]
}
