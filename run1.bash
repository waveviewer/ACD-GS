DATASET_ROOT="/mnt/nvme1n1/zhutianchi/AD/dataset/Mipnerf"
CODE_ROOT="/mnt/nvme1n1/zhutianchi/AD/NIP/ACD-GS"

# 定义指定的数据集列表
datalist=(
    "treehill"
    # "NightSnow_Reconstruction_Inputs_Outputs"
    # "Playroom_Reconstruction_Inputs_Outputs"
    # "Ponche_Reconstruction_Inputs_Outputs"
    # "SaintAnne_Reconstruction_Inputs_Outputs"
    # "Shed_Reconstruction_Inputs_Outputs"
    # "Tree-18_Reconstruction_Inputs_Outputs"
    # "Yellowhouse-12_Reconstruction_Inputs_Outputs"
)

# for dir in "$DATASET_ROOT"/*/; do
    # 拼接完整的数据集路径
    # scene_name=$(basename "$dir")
for scene_name in "${datalist[@]}"; do
    dir="$DATASET_ROOT/$scene_name"
    
    # 检查该目录是否存在，防止列表中的名称与实际文件夹名有出入
    if [ ! -d "$dir" ]; then
        echo "跳过: 目录 $dir 不存在"
        continue
    fi

    echo "------------------------------------------------"
    echo "正在处理数据集: $scene_name"
    
    # 自动定位路径逻辑
    SOURCE_PATH="$dir"
    
    # 按照原脚本逻辑，检查 sparse 文件夹
    if [ ! -d "$SOURCE_PATH/colmap/sparse" ]; then
        # 如果根目录下没有 sparse，可能在子目录或其他结构，此处保留原脚本逻辑
        echo "提示: 在 $SOURCE_PATH 下未找到 sparse 文件夹"
    fi
    
    echo "使用源路径: $SOURCE_PATH"
    echo "------------------------------------------------"
    
    # 3. 执行训练
    CUDA_VISIBLE_DEVICES=0 python "$CODE_ROOT/train.py" -s "$SOURCE_PATH/colmap" -m "$CODE_ROOT/output/deepblending_eval_num/$scene_name" --eval --disable_viewer
done