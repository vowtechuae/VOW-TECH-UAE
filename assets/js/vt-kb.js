/* VOWTECH built-in knowledge base — instant answers without any AI service.
   Used by the chat widget and the Smart FAQ page whenever the AI backend is unavailable (or not configured yet).
   Only verified company facts. No prices, guarantees, certifications or invented details. */
(function () {
  'use strict';
  var TEL = '+971 58 181 6887';
  var KB = [
    { k: ['not responding', 'no response', 'not answering', 'unhappy', 'bad service', 'change provider', 'switch', 'take over', 'takeover', 'current provider', 'existing amc', 'another company', 'current amc', 'poor support'],
      a: 'Yes — VOWTECH takes over existing IT AMC and CCTV AMC contracts when the current provider is not responding. We start with a free review of what your contract covers and what is actually being delivered, document your network, devices and access details, and agree a clean handover so your team is not disrupted. You do not have to wait for the renewal date. Share your name, company and phone number, or WhatsApp us on ' + TEL + '.',
      link: ['amc-support.html#switch-amc', 'How switching AMC works'] },
    { k: ['urgent', 'emergency', 'down', 'outage', 'not working', 'server down', 'network down', 'internet down', 'hacked', 'ransomware', 'virus', 'asap', 'immediately', 'right now'],
      a: 'For an urgent problem please do not wait for a chat reply — call or WhatsApp ' + TEL + ' now. VOWTECH support is available 24/7 and our engineers can help remotely or attend your site in Abu Dhabi. Tell us what stopped working, how many users are affected and your location.',
      link: ['emergency-it-support.html', 'Emergency IT support'] },
    { k: ['price', 'cost', 'how much', 'quote', 'quotation', 'rate', 'charges', 'fees', 'budget', 'aed', 'dirham'],
      a: 'Pricing depends on your site — number of users, PCs, servers, cameras, locations and the support hours you need — so we do not publish fixed packages. We offer a free assessment and a clear written quotation scoped to your business. Send us your company name, location and a rough count of users or devices, or WhatsApp ' + TEL + '.',
      link: ['contact.html', 'Request a quotation'] },
    { k: ['cctv amc', 'cctv maintenance', 'camera maintenance', 'cctv annual', 'nvr maintenance', 'dvr maintenance', 'cctv repair', 'camera not recording', 'cctv not working', 'cctv service', 'camera offline'],
      a: 'CCTV AMC is an annual maintenance contract for your surveillance system. It covers preventive maintenance visits, camera inspection and cleaning, DVR/NVR and hard disk checks, recording verification, remote viewing and network checks, fault diagnosis and replacement recommendations where needed. We also do one-off CCTV repairs and can take over systems installed by other companies.',
      link: ['cctv-amc-abu-dhabi.html', 'CCTV AMC in Abu Dhabi'] },
    { k: ['cctv', 'camera', 'surveillance', 'nvr', 'dvr', 'ip camera', 'ptz', 'security camera'],
      a: 'VOWTECH designs and installs CCTV systems — IP cameras, PTZ cameras, NVR/DVR recording, remote viewing and the cabling and network behind them — for offices, shops, warehouses and sites in Abu Dhabi, Dubai and across the UAE. After installation the system can be covered by a CCTV AMC so it keeps recording reliably.',
      link: ['cctv-services.html', 'CCTV installation'] },
    { k: ['punch', 'punching', 'clock in', 'clock-in', 'time tracking', 'timesheet', 'time sheet'],
      a: 'A punch-in / punch-out machine records when each employee arrives and leaves using a fingerprint, face or card. The punches go to attendance software that applies your shifts, late rules and overtime and produces timesheets for payroll. We supply, install, network and configure the machines and enrol your employees.',
      link: ['punch-in-punch-out-machine-abu-dhabi.html', 'Punch-in / punch-out machines'] },
    { k: ['attendance', 'biometric', 'fingerprint', 'face recognition', 'time attendance', 'employee attendance', 'access control', 'rfid', 'door access'],
      a: 'We install biometric attendance systems — fingerprint, face recognition and card devices — including mounting, network configuration, employee enrolment, attendance software setup and centralised management for multiple branches. Devices can also be combined with door access control. Tell us your number of employees and entrances and we will recommend the right setup.',
      link: ['attendance-system-installation-abu-dhabi.html', 'Attendance system installation'] },
    { k: ['amc', 'annual maintenance', 'maintenance contract', 'it contract', 'yearly contract'],
      a: 'An IT AMC (annual maintenance contract) gives your office a year of planned IT care: preventive maintenance visits, remote helpdesk, on-site fault visits, and upkeep of PCs, servers, network, backups and security. Every contract is scoped to your site — there are no fixed packages. The website currently shows an offer of IT AMC with free CCTV AMC for one year; our team will confirm the details.',
      link: ['it-amc-abu-dhabi.html', 'IT AMC in Abu Dhabi'] },
    { k: ['managed', 'outsourc', 'monitoring', 'patching', 'it department', 'fully managed'],
      a: 'With managed IT services VOWTECH looks after your IT under one contract — monitoring, patching, helpdesk, backup checks, security, vendor coordination and reporting. It suits companies without an in-house IT team, or IT managers who want a partner to share the load (co-managed).',
      link: ['managed-it-services-abu-dhabi.html', 'Managed IT services'] },
    { k: ['cyber', 'security', 'firewall', 'sophos', 'antivirus', 'endpoint', 'phishing', 'penetration', 'pentest', 'vulnerability', 'soc', 'siem', 'hack'],
      a: 'Our cybersecurity services cover firewalls (including Sophos), endpoint protection, email and anti-phishing security, backup, security monitoring (SOC/SIEM), vulnerability assessments and penetration testing. We usually start with an assessment of your current setup and then fix the biggest risks first.',
      link: ['cybersecurity-services-uae.html', 'Cybersecurity services'] },
    { k: ['network', 'cabling', 'wifi', 'wi-fi', 'wireless', 'switch', 'router', 'server room', 'rack', 'structured', 'lan', 'internet slow', 'slow internet'],
      a: 'VOWTECH handles network infrastructure end to end: structured cabling, switches and routers, business Wi-Fi, firewalls, server rooms and racks, plus troubleshooting of slow or unstable networks. We also plan the network for CCTV, attendance devices and IP phones.',
      link: ['networking-infrastructure-uae.html', 'Network infrastructure'] },
    { k: ['cloud', 'office 365', 'microsoft 365', 'm365', 'o365', 'email', 'exchange', 'backup', 'veeam', 'acronis', 'disaster recovery', 'virtualization', 'vmware', 'migration', 'migrate'],
      a: 'We provide cloud services including Microsoft 365 and Exchange email setup and migration, private cloud, cloud backup and disaster recovery (including Veeam and Acronis), and server virtualisation. We plan the migration so your team keeps working while data is moved.',
      link: ['cloud-solutions-uae.html', 'Cloud solutions'] },
    { k: ['server', 'storage', 'nas', 'san', 'ups', 'laptop', 'computer', 'hardware', 'product', 'license', 'licence', 'software', 'supply', 'buy', 'purchase'],
      a: 'VOWTECH supplies and installs IT products — servers, storage (NAS/SAN), networking equipment, firewalls, CCTV, access control and attendance devices, UPS systems and licensed software — and supports them after installation. Send us your requirement or bill of quantities for a quotation.',
      link: ['it-products.html', 'IT products A–Z'] },
    { k: ['office setup', 'new office', 'relocation', 'moving office', 'office move', 'shifting', 'fit out', 'fit-out'],
      a: 'For a new office or a relocation we handle the complete IT setup: cabling, network and Wi-Fi, server room, PCs and printers, telephones, CCTV and attendance devices, and moving your existing systems with minimal downtime.',
      link: ['office-it-setup-relocation.html', 'Office IT setup & relocation'] },
    { k: ['dubai', 'sharjah', 'ajman', 'al ain', 'rak', 'ras al khaimah', 'fujairah', 'emirates', 'uae', 'which areas', 'areas', 'where do you', 'do you cover', 'serve'],
      a: 'VOWTECH is based in Abu Dhabi and serves businesses in Abu Dhabi, Dubai and across the UAE. Most support is delivered remotely straight away, and our engineers travel to your site when hands-on work is needed. Our only office is in Abu Dhabi.',
      link: ['it-support-uae.html', 'IT support across the UAE'] },
    { k: ['location', 'address', 'office', 'where are you', 'located', 'map', 'visit'],
      a: 'Our office is at Navy Gate, Al Zahiyah, Abu Dhabi, UAE. You can reach us 24/7 on ' + TEL + ' (call or WhatsApp) or at info@vow-tech.com.',
      link: ['contact.html', 'Contact & map'] },
    { k: ['contact', 'phone', 'call', 'number', 'whatsapp', 'email', 'reach', 'talk to', 'speak', 'human', 'agent', 'person', 'sales', 'hours', 'timing', 'open'],
      a: 'You can reach the VOWTECH team 24/7: call or WhatsApp ' + TEL + ', email info@vow-tech.com, or use the contact form on the website. If you leave your name, company and phone number here, tell us the best time to call.',
      link: ['contact.html', 'Contact us'] },
    { k: ['consultation', 'appointment', 'meeting', 'site visit', 'assessment', 'survey', 'audit', 'demo'],
      a: 'We offer a free consultation and site assessment. We review your current setup, list the risks and gaps in plain English, and give you a written proposal scoped to your business — with no obligation.',
      link: ['appointment.html', 'Book a free consultation'] },
    { k: ['it support', 'helpdesk', 'help desk', 'support', 'technician', 'engineer', 'remote', 'on-site', 'onsite', 'printer', 'pc problem', 'computer problem'],
      a: 'VOWTECH provides IT support for businesses 24/7 — remote helpdesk for day-to-day issues and on-site engineers in Abu Dhabi when hands-on work is needed. Support can be on a contract (IT AMC or managed IT) or arranged when you need it.',
      link: ['it-support-abu-dhabi.html', 'IT support in Abu Dhabi'] },
    { k: ['who are you', 'about', 'company', 'vowtech', 'vow tech', 'what do you do', 'services', 'since', 'established', 'experience'],
      a: 'VOWTECH (VOW Technologies) is an IT services company based in Abu Dhabi, established in 2015. We provide IT support and IT AMC, managed IT, cybersecurity, networking, cloud, CCTV installation and CCTV AMC, attendance and access control systems, and IT products — for businesses in Abu Dhabi, Dubai and across the UAE.',
      link: ['index.html#services', 'All services'] }
    , { k: [' hi ', ' hello', ' hey ', 'salam', 'good morning', 'good afternoon', 'good evening', 'marhaba'],
      a: 'Hello, and welcome to VOWTECH. Tell me what you need — for example IT support, an IT AMC, CCTV maintenance, an attendance system, or help because your current provider is not responding — and I will point you in the right direction.',
      link: ['index.html#services', 'See all services'] }
  ];
  var FALLBACK ={ a: 'Thanks for your message. I can help with IT support, IT AMC, CCTV AMC, attendance systems, networking, cybersecurity and cloud. For a quick answer from our team, call or WhatsApp ' + TEL + ' — or tell me a bit more about what you need.', link: ['contact.html', 'Contact the team'] };

  function norm(s) { return (' ' + String(s || '').toLowerCase().replace(/[^a-z0-9؀-ۿ+\- ]+/g, ' ').replace(/\s+/g, ' ') + ' '); }
  window.vtLocalAnswer = function (q) {
    var t = norm(q), best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var s = 0;
      for (var j = 0; j < KB[i].k.length; j++) { var kw = KB[i].k[j]; if (t.indexOf(kw) > -1) s += kw.indexOf(' ') > -1 ? 3 : (kw.length > 5 ? 2 : 1.5); }
      if (s > bestScore) { bestScore = s; best = KB[i]; }   // earlier entries win ties (ordered by priority)
    }
    var hit = best || FALLBACK;
    return { text: hit.a, href: hit.link[0], label: hit.link[1], matched: !!best };
  };
})();
