---
title: "Install Azure DevOps on Server Core"
linkTitle: "Install Azure DevOps on Server Core"
tags: ["DevOps", "Deployment", "Automation", "Server Core"]
categories: ["Article", "2023", "Deployment"]
---

Since **Azure DevOps Server 2022** finally supports a deployment on Server Core, I can replace another GUI Server in my LAB. In this write up, I will show you all the steps to get it up and running in your environment.

To have a quick peek at the service, you will get away with a 2 CPU, 4 GB memory, 15 GB hard drive VM (not using the **Code Search** feature). Later I eventually expanded the disk to 20 GB drive space, do be able to do OS updates. Also an additional 50 GB disk for projects, repo's and pipelines is recommended, if you want get serious with Azure DevOps Server.

Download the Express Version ISO of Azure DevOps Server 2022, by choosing this version, you have a free license for up to 5 active users.

**Quote**, [Download Azure Devops Server][1]
Azure DevOps Server Express is free, simple to set up on both client and server operating systems, and supports all the same features as Azure DevOps Server. The only difference is that it is limited by licensing agreements to five or fewer active users.
You can copy my code snippets and replace the **my.. values** with the information about your environment and we should be able to finish the install in 10 to 15 Minutes.

Connect to a new Server 2022 VM and we can start with the setup and configuration.
At First, I always take care about the IP address "bug" in **sconfig** (starts up by default since 2022 Server and is now a PowerShell, instead ob VB-script), that fails most of the time with an **"Failed to release DHCP lease"** error. Normally, we should have set the IP etc. by configuration management already and don't bother with manual changes of default settings in our LAB.

For completeness of this article, I show you how I set up my IP and set a DNS-Server.
Because the InterfaceIndex changes from VM to VM and we could have multiple NICs installed in our VM, I like to find out the InterfaceIndex first:

```powershell
$IntIndex = Get-NetIPConfiguration | % { Process { If ( $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -ne "Disconnected"  ) { $_.InterfaceIndex } }}
```

**Explanation**: I try to find a **connected** NIC that also has **not set a gateway IP** (that way, I exclude virtual switches etc.) and then I will configure this interface in the next step.
Add your desired local IP, Gateway, and Prefix (24/255.255.255.0 in my example)

```powershell
Set-NetIPAddress -IPAddress` myLocalIP -InterfaceIndex $IntIndex -PrefixLength 24 -DefaultGateway MyGatewayIP

Set-DNSClientServerAddress –interfaceIndex $IntIndex –ServerAddresses ("MyFirstDNSIP","MySecondDNSIP")
```

Let's start the setup and mount the ISO to your VM, change your directory and run the installer:

```powershell
.\AzureDevOpsExpress2022.exe /Full /Q /S
```

After the setup is done, we also should get a certificate from our local PKI to avoid the use of a self signed certificate:

```powershell
Get-Certificate -Template yourPKITemplateName -SubjectName 'cn=servername.local' -DnsName 'servername','servername.local','serverIP','servicename','servicename.local' -CertStoreLocation Cert:\LocalMachine\My
```

Our server is still not running, we need to open the Azure DevOps Server Administration Console first and start with the configuration of the database, web server etc.,

```powershell
& 'C:\Program Files\Azure DevOps Server 2022\Tools\TfsMgmt.exe'
```

I set the web service to HTTP first and after I have done the SSL Binding to the Website, I change it to HTTPS. To set the SSL Binding, use the following code:

```powershell
#get the ThumbPrint of the Certificate we created earlier
$cert = ls Cert:\LocalMachine\My\ | select -Last 1

#Bind it to the Devops Server site
New-IISSiteBinding -Name "Azure Devops Server" -BindingInformation "*:443:" -Protocol https -CertificateThumbPrint $cert.Thumbprint -CertStoreLocation "Cert:\LocalMachine\My"
```

**Notes:**
I sometimes got a very high CPU load on the server, caused by the .net optimization process, you can stop that:

```Powershell
'C:\Windows\Microsoft.NET\Framework\v4.0.30319\ngen.exe executequeueditems'
```

That's it, setup some AD-Groups to give your users appropriate permissions to the DevOps server and give it a try. A German version of this how-to, will be published on my blog soon.

[1] [https://learn.microsoft.com/en-us/azure/devops/server/download/azuredevopsserver?view=azure-devops]
