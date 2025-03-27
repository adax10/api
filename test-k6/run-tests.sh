cd test-k6

if [ ! -f "./.env" ]; then
    echo "\033[31mERROR: .env file not found in the test-k6 folder. Please create it by copying .env.example (the one from test-k6 folder) and filling in the required data.\033[0m"
    exit 1
fi

export $(grep -v "^#" ./.env | xargs)

MODULE=""

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --module=*) MODULE="${1#*=}" ;;
        *) echo "\033[31mERROR: Unknown argument: $1"; exit 1;
    esac
    shift
done

DATE=$(date +'%Y-%m-%d-%H-%M-%S')
mkdir -p test-report/$DATE
export K6_WEB_DASHBOARD_EXPORT=test-report/$DATE/web-dashboard.html

k6 run setup.ts \
  -e MODULE=${MODULE} \
  --summary-export=test-report/$DATE/summary.json
