@echo off

:: Iniciar o backend com nodemon
cd /d "C:\Projeto de desemvolvimento 1\Agendamento_Janice_Beleza_Estetica\Back"
start cmd /k "npx nodemon app"

:: Iniciar o frontend
cd /d "C:\Projeto de desemvolvimento 1\Agendamento_Janice_Beleza_Estetica\Front"
start cmd /k "npm run dev"

:: Aguardar até que o frontend esteja disponível (exemplo usando wait-on)
npx wait-on http://localhost:3000 && (
    :: Abrir o navegador com a URL do frontend
    start "" "http://localhost:3000"
)

:: Ou aguardar um tempo fixo
:: timeout /t 10 /nobreak

:: Opcional: fechar o prompt de comando inicial
exit
