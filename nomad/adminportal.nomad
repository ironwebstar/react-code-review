job "adminportal-v2" {
  datacenters = [
    "[[ .datacenter ]]",
  ]

  constraint {
    attribute = "${node.class}"
    value     = "worker"
  }

  type = "service"

  update {
    min_healthy_time = "20s"
    auto_revert      = true
  }

  group "web" {
    count = 2
    task "adminportal-v2" {
      driver = "docker"
      config {
        image        = "registry.noumenadigital.com/noumena/ckw-ui/adminportal-v2:[[ .version ]]"
        network_mode = "host"
      }
      env {
        NGINX_PORT = "${NOMAD_PORT_http}"
      }
      resources {
        cpu    = 100
        memory = 128
        network {
          mbits = 1
          port "http" {}
        }
      }

      service {
        name = "adminportal-v2"
        port = "http"
        tags = [
          "version=[[ .version ]]",
          "traefik.enable=true",
          "traefik.frontend.rule=Host:adminportal-beta.[[ .domain ]];PathPrefix:/",
          "traefik.frontend.entryPoints=[[ .entrypoint ]]",
        ]
        check {
          name     = "ZEV Adminportal beta Health Check"
          type     = "http"
          path     = "/"
          interval = "10s"
          timeout  = "1s"
        }
      }
    }
  }
}
