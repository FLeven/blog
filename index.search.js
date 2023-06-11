var relearn_search_index = [
  {
    "content": "Felix Leven Employment since 2000 TechnoCargo Logistik GmbH u. Co.KG - Senior Systems Engineer Microsoft \u0026 Citrix.\n2019 - 2021 TechnoCargo Logistik GmbH u. Co.KG - Team Leader Microsoft \u0026 Citrix.\n2015 - 2018 Leven IT-S self-employed.\nEducation 2000 -2001 Niederrheinische Industrie- und Handelskammer - Network Supervisor (IHK)\nTopics: Windows, Linux, Novell Netware, Networking and ISDN\n1997 - 2000 TechnoCargo Logistik GmbH u. Co.KG - Training as a forwarding merchant (IHK)\n1995 - 1996 Realschule Rückertstrasse - Fachoberschulreife (US high school diploma with no AP).\nAreas of expertise Microsoft (Infrastruktur, MS-SQL, Exchange) Citrix virtual Apps and Desktops Automation and Deployment (Powershell, DSC, Chocolatey, MDT) Windows Container (Windows DockerEE, Mirantis, Compose) Chocolatey C4B FSlogix Prometheus - Grafana - Windows/BlackBox/SNMP-Monitoring DevOps Windows (GiTea, Jenkins, Nexus) Hyper-V,vSphere,Proxmox (Novice) Linux (Novice) Linux Container (Novice) Kubernetes (Novice) Azure (Novice) Netscaler (Novice) Languages Fluent in Germadn and English Hobbys USA Cycling Running Certifications Transcript\nPublications: Install Azure DevOps Server 2022 on Server Core\n",
    "description": "",
    "tags": [
      "about",
      "cv",
      "transcript"
    ],
    "title": "CV",
    "uri": "/about/cv/index.html"
  },
  {
    "content": " CV Transcripts ",
    "description": "",
    "tags": null,
    "title": "About FL",
    "uri": "/about/index.html"
  },
  {
    "content": " About FL CV Transcripts Blog Blog Posts - 2023 Blog Posts - 2022 ",
    "description": "",
    "tags": null,
    "title": "Blog Posts - 2023",
    "uri": "/index.html"
  },
  {
    "content": " Install Azure DevOps on Server CoreSince Azure DevOps Server 2022 finally supports a deployment on Server Core, I can replace another GUI Server in my LAB. In this write up, I will show you all the steps to get it up and running in your environment. To have a quick peek at the service, you will get away with a 2 CPU, 4 GB memory, 15 GB hard drive VM (not using the Code Search feature).\n",
    "description": "",
    "tags": null,
    "title": "Blog Posts - 2023",
    "uri": "/blog/2023/index.html"
  },
  {
    "content": " Hello WorldHello World\n",
    "description": "",
    "tags": null,
    "title": "Blog Posts - 2022",
    "uri": "/blog/2022/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Category - 2023",
    "uri": "/categories/2023/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - about",
    "uri": "/tags/about/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Category - about",
    "uri": "/categories/about/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Category - Article",
    "uri": "/categories/article/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - Automation",
    "uri": "/tags/automation/index.html"
  },
  {
    "content": " Blog Posts - 2023 Blog Posts - 2022 ",
    "description": "",
    "tags": null,
    "title": "Blog",
    "uri": "/blog/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Categories",
    "uri": "/categories/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - cv",
    "uri": "/tags/cv/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - Deployment",
    "uri": "/tags/deployment/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Category - Deployment",
    "uri": "/categories/deployment/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - DevOps",
    "uri": "/tags/devops/index.html"
  },
  {
    "content": "Hello World\n",
    "description": "",
    "tags": [
      "offtopic"
    ],
    "title": "Hello World",
    "uri": "/blog/2022/hellow/index.html"
  },
  {
    "content": "Since Azure DevOps Server 2022 finally supports a deployment on Server Core, I can replace another GUI Server in my LAB. In this write up, I will show you all the steps to get it up and running in your environment.\nTo have a quick peek at the service, you will get away with a 2 CPU, 4 GB memory, 15 GB hard drive VM (not using the Code Search feature). Later I eventually expanded the disk to 20 GB drive space, do be able to do OS updates. Also an additional 50 GB disk for projects, repo’s and pipelines is recommended, if you want get serious with Azure DevOps Server.\nDownload the Express Version ISO of Azure DevOps Server 2022, by choosing this version, you have a free license for up to 5 active users.\nQuote, Download Azure Devops Server Azure DevOps Server Express is free, simple to set up on both client and server operating systems, and supports all the same features as Azure DevOps Server. The only difference is that it is limited by licensing agreements to five or fewer active users. You can copy my code snippets and replace the my.. values with the information about your environment and we should be able to finish the install in 10 to 15 Minutes.\nConnect to a new Server 2022 VM and we can start with the setup and configuration. At First, I always take care about the IP address “bug” in sconfig (starts up by default since 2022 Server and is now a PowerShell, instead ob VB-script), that fails most of the time with an “Failed to release DHCP lease” error. Normally, we should have set the IP etc. by configuration management already and don’t bother with manual changes of default settings in our LAB.\nFor completeness of this article, I show you how I set up my IP and set a DNS-Server. Because the InterfaceIndex changes from VM to VM and we could have multiple NICs installed in our VM, I like to find out the InterfaceIndex first:\n$IntIndex = Get-NetIPConfiguration | % { Process { If ( $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -ne \"Disconnected\" ) { $_.InterfaceIndex } }} Explanation: I try to find a connected NIC that also has not set a gateway IP (that way, I exclude virtual switches etc.) and then I will configure this interface in the next step. Add your desired local IP, Gateway, and Prefix (24/255.255.255.0 in my example)\nSet-NetIPAddress -IPAddress` myLocalIP -InterfaceIndex $IntIndex -PrefixLength 24 -DefaultGateway MyGatewayIP Set-DNSClientServerAddress –interfaceIndex $IntIndex –ServerAddresses (\"MyFirstDNSIP\",\"MySecondDNSIP\") Let’s start the setup and mount the ISO to your VM, change your directory and run the installer:\n.\\AzureDevOpsExpress2022.exe /Full /Q /S After the setup is done, we also should get a certificate from our local PKI to avoid the use of a self signed certificate:\nGet-Certificate -Template yourPKITemplateName -SubjectName 'cn=servername.local' -DnsName 'servername','servername.local','serverIP','servicename','servicename.local' -CertStoreLocation Cert:\\LocalMachine\\My Our server is still not running, we need to open the Azure DevOps Server Administration Console first and start with the configuration of the database, web server etc.,\n\u0026 'C:\\Program Files\\Azure DevOps Server 2022\\Tools\\TfsMgmt.exe' I set the web service to HTTP first and after I have done the SSL Binding to the Website, I change it to HTTPS. To set the SSL Binding, use the following code:\n#get the ThumbPrint of the Certificate we created earlier $cert = ls Cert:\\LocalMachine\\My\\ | select -Last 1 #Bind it to the Devops Server site New-IISSiteBinding -Name \"Azure Devops Server\" -BindingInformation \"*:443:\" -Protocol https -CertificateThumbPrint $cert.Thumbprint -CertStoreLocation \"Cert:\\LocalMachine\\My\" Notes: I sometimes got a very high CPU load on the server, caused by the .net optimization process, you can stop that:\nC:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\ngen.exe executequeueditems That’s it, setup some AD-Groups to give your users appropriate permissions to the DevOps server and give it a try. A German version of this how-to, will be published on my blog soon.\n",
    "description": "",
    "tags": [
      "DevOps",
      "Deployment",
      "Automation",
      "Server Core"
    ],
    "title": "Install Azure DevOps on Server Core",
    "uri": "/blog/2023/azure_devops_on_servercroe/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - offtopic",
    "uri": "/tags/offtopic/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Category - offtopic",
    "uri": "/categories/offtopic/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - Server Core",
    "uri": "/tags/server-core/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tags",
    "uri": "/tags/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Tag - transcript",
    "uri": "/tags/transcript/index.html"
  },
  {
    "content": "Microsoft - Visit my transcript Microsoft® Certified IT Professional (2002) MCP original print 2002 MCP online 2022 Microsoft® Certified Solutions Expert: Server Infrastructure (Charter Member) MCSE Charter Member Original MCSE Charter Member online 2022 Microsoft® Certified Solutions Expert: 2k MCSE 2k Original Microsoft Certified: Azure Data Fundamentals Microsoft 365 Certified: Teams Administrator Associate Teams 2022 30+ more, Messaging, Security, MSSql Citrix Citrix® Certified Professional – Virtualization CCP-V 2017 Citrix® Certified Professional – Apps and Desktop CCP-V 2014 Citrix® Certified Administrator – Presentation Server 4 CCA-PS4 2009 Linux - Visit my transcript LFCA: Linux Foundation Certified IT Associate LFCA 2022 KCNA: Kubernetes and Cloud Native Associate KCNA 2022 Cisco (expired) Cisco CCNA (2011) CCNA 2011 Original Erste Prüfungen CCNP bestanden Apple (expired) Apple Certified Technical Coordinator 10.5 (2009) ACTC 2009 Apple Certified Support Professional 10.5 (2009) ACSP 2009 ",
    "description": "",
    "tags": [
      "about",
      "cv",
      "transcript"
    ],
    "title": "Transcripts",
    "uri": "/about/transcript/index.html"
  }
]
