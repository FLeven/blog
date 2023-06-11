var relearn_search_index = [
  {
    "content": "Felix Leven Mail | Github | Xing\nBerufserfahrung seid 2000 TechnoCargo Logistik GmbH u. Co.KG - Senior Systems Engineer Microsoft \u0026 Citrix.\n2019-2021 TechnoCargo Logistik GmbH u. Co.KG - Teamleiter im Bereich Microsoft \u0026 Citrix.\n2015-2018 Leven IT-S Selbständig.\nAusbildung 2000 Niederrheinische Industrie- und Handelskammer - IHK - Fachkraft für EDV Netzwerkbetreuung\nMS-Dos und Windows, Linux-Unix, Novell NetWare, Networking and ISDN\n1997-2000 TechnoCargo Logistik GmbH u. Co.KG - Ausbildung zum Speditionskaufmann (IHK)\n1995-1996 Realschule Rückertstrasse - Fachoberschulreife.\nKenntnisse und Interessen Microsoft (Infrastruktur, MS-SQL, Exchange) Citrix virtual Apps and Desktops Automation and Deployment (Powershell, DSC, Chocolatey, MDT) Windows Container (Windows DockerEE, Mirantis, Compose) Chocolatey C4B FSlogix Prometheus - Grafana - Windows/BlackBox/SNMP-Monitoring DevOps Windows (GiTea, Jenkins, Nexus) Hyper-V,vSphere,Proxmox (Novice) Linux (Novice) Linux Container (Novice) Kubernetes (Novice) Azure (Novice) Netscaler (Novice) Fremdsprachen Deutsch (Muttersprache) Englisch (fliessend) Hobbys USA Radfahren Joggen Veröffentlichungen: Install Azure DevOps Server 2022 on Server Core\nZertifizierung Transcript\n",
    "description": "",
    "tags": [
      "about",
      "cv",
      "transcript"
    ],
    "title": "Lebenslauf",
    "uri": "/de/about/cv/index.html"
  },
  {
    "content": " Lebenslauf Zertifizierungen ",
    "description": "",
    "tags": null,
    "title": "Über FL",
    "uri": "/de/about/index.html"
  },
  {
    "content": " Über FL Lebenslauf Zertifizierungen Blog Blog Artikel - 2023 Blog Artikel - 2022 ",
    "description": "",
    "tags": null,
    "title": "Blog Artikel - 2023",
    "uri": "/de/index.html"
  },
  {
    "content": " Azure DevOps 2022 auf Server Core installierenSince Azure DevOps Server 2022 finally supports a deployment on Server Core, I can replace another GUI Server in my LAB. In this write up, I will show you all the steps to get it up and running in your environment. To have a quick peek at the service, you will get away with a 2 CPU, 4 GB memory, 15 GB hard drive VM (not using the Code Search feature).\n",
    "description": "",
    "tags": null,
    "title": "Blog Artikel - 2023",
    "uri": "/de/blog/2023/index.html"
  },
  {
    "content": " Hallo WeltHallo Welt\n",
    "description": "",
    "tags": null,
    "title": "Blog Artikel - 2022",
    "uri": "/de/blog/2022/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Kategorie - 2023",
    "uri": "/de/categories/2023/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - about",
    "uri": "/de/tags/about/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Kategorie - about",
    "uri": "/de/categories/about/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Kategorie - Article",
    "uri": "/de/categories/article/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - Automation",
    "uri": "/de/tags/automation/index.html"
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
    "title": "Azure DevOps 2022 auf Server Core installieren",
    "uri": "/de/blog/2023/azure_devops_on_servercroe/index.html"
  },
  {
    "content": " Blog Artikel - 2023 Blog Artikel - 2022 ",
    "description": "",
    "tags": null,
    "title": "Blog",
    "uri": "/de/blog/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Kategorien",
    "uri": "/de/categories/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - cv",
    "uri": "/de/tags/cv/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - Deployment",
    "uri": "/de/tags/deployment/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Kategorie - Deployment",
    "uri": "/de/categories/deployment/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - DevOps",
    "uri": "/de/tags/devops/index.html"
  },
  {
    "content": "Hallo Welt\n",
    "description": "",
    "tags": [
      "offtopic"
    ],
    "title": "Hallo Welt",
    "uri": "/de/blog/2022/hellow/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - offtopic",
    "uri": "/de/tags/offtopic/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Kategorie - offtopic",
    "uri": "/de/categories/offtopic/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - Server Core",
    "uri": "/de/tags/server-core/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichworte",
    "uri": "/de/tags/index.html"
  },
  {
    "content": "",
    "description": "",
    "tags": null,
    "title": "Stichwort - transcript",
    "uri": "/de/tags/transcript/index.html"
  },
  {
    "content": "Microsoft - Übersicht aller Zertifikate Microsoft® Certified IT Professional (2002) MCP original print 2002 MCP online 2022 Microsoft® Certified Solutions Expert: Server Infrastructure (Charter Member) MCSE Charter Member Original MCSE Charter Member online 2022 Microsoft® Certified Solutions Expert: 2k MCSE 2k Original Microsoft Certified: Azure Data Fundamentals Microsoft 365 Certified: Teams Administrator Associate Teams 2022 30+ weitere in allen Themengebieten Messaging, Security, MSSql Microsoft Produkte sind weiterhin ein starker Eckpfeiler für alle die in der IT arbeiten möchten. Um die eigenen Fähigkeiten wirklich weiterentwickeln zu können (und die Verdienstmöglichkeiten), werden allerdings Kenntnisse in weiteren Fachgebieten benötig.\nCitrix Citrix® Certified Professional – Virtualization CCP-V 2017 Citrix® Certified Professional – Apps and Desktop CCP-V 2014 Citrix® Certified Administrator – Presentation Server 4 CCA-PS4 2009 Obwohl nicht mehr Zeitgemäß in der Umsetzung, sind Citrix Kenntnisse weiterhin eine sehr luktrative und tragfähige Kompoentene für die IT-Karriere.\nLinux - Übersicht aller Zertifikate LFCA: Linux Foundation Certified IT Associate LFCA 2022 KCNA: Kubernetes and Cloud Native Associate KCNA 2022 Seit kurzem habe ich mich auch mit dem Linux OS und Kubernetes / Container ernsthafter beschäftig und konnte dort erste Erfolge verbuchen. Linux hat mich zwar seit Debian 2.1 begleitet, konnte mein Interesse aber nie ganz gewinnen und hätte mir auch beruflich bisher keine nennenswerten Möglichkeiten eröffnet.\nCisco (abgelaufen) Cisco CCNA (2011) CCNA 2011 Original Erste Prüfungen CCNP bestanden (Routing und Switching) Der CCNA ist weiterhin eine wichtige Grundlage, für jeden der mit Netzwerken arbeiten möchte. Die CCNP Rounting \u0026 Switching Prüfung, habe ich als eine der anspruchsvollsten noch sehr gut in Erinnerung.\nApple (abgelaufen) Apple Certified Technical Coordinator 10.5 (2009) ACTC 2009 Apple Certified Support Professional 10.5 (2009) ACSP 2009 Damals, als viele noch gehofft haben, Apple könnte und würde eine ernstzunehmende Alternative zur Microsoft Platform anstreben, habe ich relativ viel Zeit und Geld in den Ausbau meiner Apple Fähigkeiten investiert. Mein Fokus lag damlas auf dem Bereich kleinerer Client und Server Arbeitsgruppen mit Xstorage.\n",
    "description": "",
    "tags": [
      "about",
      "cv",
      "transcript"
    ],
    "title": "Zertifizierungen",
    "uri": "/de/about/transcript/index.html"
  }
]
