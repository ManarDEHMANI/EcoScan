# Makefile

.PHONY: test coverage clean

test:
	pytest tests/

coverage:
	pytest --cov=app --cov-report=html tests/
	@echo "Rapport de couverture généré : ouvrez htmlcov/index.html"

clean:
	rm -rf __pycache__ .pytest_cache htmlcov .coverage