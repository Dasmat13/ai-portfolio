output "cluster_name" {
  value = module.gke.name
}

output "endpoint" {
  value = module.gke.endpoint
}

output "subnet_names" {
  value = module.vpc.subnets_names
}
