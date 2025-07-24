terraform {
  required_version = ">= 1.5.0"
  backend "gcs" {
    bucket = "ai-portfolio-terraform-state"
    prefix = "terraform/state"
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.45.0, < 7.0.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = ">= 5.45.0, < 7.0.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.11"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

########################
# 1. VPC with ranges   #
########################
module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "7.5.0"                       # >=7.x supports provider 5.x
  project_id   = var.project_id
  network_name = "ai-portfolio-vpc"

  subnets = [{
    subnet_name           = "subnet-1"
    subnet_ip             = "10.10.10.0/24"
    subnet_region         = var.region
    subnet_private_access = true
  }]

  secondary_ranges = {
    subnet-1 = [
      {
        range_name    = "pods"
        ip_cidr_range = "10.20.0.0/16"
      },
      {
        range_name    = "services"
        ip_cidr_range = "10.30.0.0/20"
      }
    ]
  }
}

########################
# 2. GKE cluster       #
########################
module "gke" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  version = "30.3.0"                      # pairs with provider 5.x
  project_id = var.project_id

  name   = "ai-portfolio-cluster"
  region = var.region

  network    = module.vpc.network_name
  subnetwork = module.vpc.subnets_names[0]

  ip_range_pods     = "pods"
  ip_range_services = "services"

  # smallest regional cluster that fits free quotas
  remove_default_node_pool = true
  release_channel          = "REGULAR"

  node_pools = [{
    name          = "default-pool"
    machine_type  = "e2-medium"
    min_count     = 1
    max_count     = 1
    disk_type     = "pd-standard"   # avoids SSD quota
    disk_size_gb  = 20
    auto_upgrade  = true
    auto_repair   = true
  }]
}

########################
# 3. Outputs           #
########################
output "cluster_name" { value = module.gke.name }
output "endpoint"      { value = module.gke.endpoint }
output "subnet_names"  { value = module.vpc.subnets_names }
