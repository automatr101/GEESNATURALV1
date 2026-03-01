# Update all pages: add Font Awesome, update nav logo, fix social icons, clean footer links

$root = "c:\Users\Admin\Downloads\gee-s-naturals"
$pages = @('shop\index.html','product\index.html','about-us\index.html','contact\index.html')

$faLink = '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">'

$oldLogoMark = '<div class="nav-logo-mark">GN</div>' + "`r`n      Gee's Naturals"
$newLogo = '<img src="../logo.png" alt="Gee''s Naturals" onerror="this.style.display=''none''; this.insertAdjacentHTML(''afterend'',''<div class=nav-logo-fallback>GN</div>'')">'

$oldSocials = @'
        <div class="footer-social">
          <a href="#" aria-label="Instagram">&#x1F4F8;</a>
          <a href="#" aria-label="Facebook">&#x1F4D8;</a>
          <a href="#" aria-label="Twitter">&#x1F426;</a>
          <a href="#" aria-label="WhatsApp">&#x1F4AC;</a>
        </div>
'@

$newSocials = @'
        <div class="footer-social">
          <a href="mailto:hello@geesnaturals.com" title="Email" aria-label="Email us"><i class="fa-solid fa-envelope"></i></a>
          <a href="https://wa.me/233XXXXXXXXX" title="WhatsApp" aria-label="WhatsApp" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
'@

foreach ($page in $pages) {
    $path = Join-Path $root $page
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    # Add Font Awesome after styles.css link (only if not already added)
    if ($content -notmatch 'font-awesome') {
        $content = $content -replace '(<link rel="stylesheet" href="../styles.css">)', "`$1`r`n$faLink"
    }

    # Fix nav logo - replace the old logo-mark div + text
    $content = $content -replace '(?s)<div class="nav-logo-mark">GN</div>\s*Gee''s Naturals', '<img src="../logo.png" alt="Gees Naturals" onerror="this.style.display=''none''">'

    # Remove Our Farmers and Sustainability links
    $content = $content -replace '\s*<a href="#">Our Farmers</a>', ''
    $content = $content -replace '\s*<a href="#">Sustainability</a>', ''

    # Remove Shipping Info, Returns, Privacy Policy links
    $content = $content -replace '\s*<a href="#">Shipping Info</a>', ''
    $content = $content -replace '\s*<a href="#">Returns</a>', ''
    $content = $content -replace '\s*<a href="#">Privacy Policy</a>', ''

    # Replace social emoji links with Font Awesome
    $content = $content -replace '(?s)<div class="footer-social">.*?</div>', '<div class="footer-social">
          <a href="mailto:hello@geesnaturals.com" title="Email" aria-label="Email us"><i class="fa-solid fa-envelope"></i></a>
          <a href="https://wa.me/233XXXXXXXXX" title="WhatsApp" aria-label="WhatsApp" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
        </div>'

    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $page"
}

Write-Host "All pages updated!"
