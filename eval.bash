
OUT_ROOT="your_output_root"

for dir in "$OUT_ROOT"/*/; do
    if [ ! -d "$dir" ]; then
        echo "skip $dir not a directory"
        continue
    fi
    echo "------------------------------------------------"
    echo "evaluate: $scene_name"
    
    SOURCE_PATH="$dir"
    
    python render.py -m $SOURCE_PATH --iteration 30000 --eval --skip_train
    python metrics.py -m $SOURCE_PATH
done
echo "complete all evaluation"