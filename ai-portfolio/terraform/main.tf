module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "~> 7.1"

  project_id   = var.project_id
  network_name = "ai-portfolio-vpc"

  subnets = [
    {
      subnet_name   = "subnet-1"
      subnet_ip     = "10.10.10.0/24"
      subnet_region = "us-central1"
    }
  ]
}

module "gke" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  version = "~> 30.0"

  project_id       = var.project_id
  name             = "ai-portfolio-cluster"
  region           = "us-central1"
  network          = module.vpc.network_name
  subnetwork       = module.vpc.subnets_names[0]

  ip_range_pods     = "pods"
  ip_range_services = "services"

  remove_default_node_pool = true
  initial_node_count       = 1

  node_pools = [
    {
      name         = "default-pool"
      machine_type = "e2-medium"
      min_count    = 1
      max_count    = 3
      disk_size_gb = 100
      auto_upgrade = true
    }
  ]
}
