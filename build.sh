mkdir -p build/

cat src/config.fc > build/config.fc

ton-compiler --input build/config.fc --output build/config.fif
ton-compiler --fift --input build/config.fif --output build/config.cell
