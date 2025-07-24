terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.9.0, < 7.0.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = ">= 5.9.0, < 7.0.0"
    }
  }

  required_version = ">= 1.3.0"

  backend "gcs" {
    bucket = "ai-portfolio-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = "us-central1"
}

provider "google-beta" {
  project = var.project_id
  region  = "us-central1"
}
