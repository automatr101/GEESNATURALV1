$root = "c:\Users\Admin\Downloads\gee-s-naturals"
$pages = @('home\index.html', 'shop\index.html', 'product\index.html', 'about-us\index.html', 'contact\index.html')

foreach ($page in $pages) {
    $path = Join-Path $root $page
    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
        
        # Replace .png with .svg
        $content = $content -replace 'logo.png', 'logo.svg'
        
        # In case the previous script failed to update some logo marks, try again more broadly
        # This targets the whole logo block if still in old format
        if ($content -match '<div class="nav-logo-mark">') {
            $content = $content -replace '(?s)<a href="index.html" class="nav-logo">.*?</a>', '<a href="index.html" class="nav-logo">
        <img src="../logo.svg" alt="Gee''s Naturals" style="height: 48px;">
      </a>'
        }

        # Ensure correct relative path in home/index.html vs others if needed?
        # Actually all subfolders are 1 level deep, so ../logo.svg is correct for all.

        [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated logo in $page"
    }
}
