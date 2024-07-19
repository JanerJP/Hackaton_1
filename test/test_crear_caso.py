from playwright.sync_api import sync_playwright

def test_crear_caso():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/crear-caso")
        page.fill("input[name='descripcion']", "Caso de prueba")
        page.fill("input[name='estado']", "Abierto")
        page.fill("input[name='responsable']", "Usuario de prueba")
        page.click("button[type='submit']")
        assert page.url == "http://localhost:8000/seguimiento"
        browser.close()