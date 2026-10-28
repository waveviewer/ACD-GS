

## Environment Setup

```bash
git clone https://github.com/arno5342/ACD_GS.git
cd ACD_GS

conda env create -f environment.yml 
conda activate ACDGS

export CUDA_HOME=/usr/local/cuda-12.8
export PATH="$CUDA_HOME/bin:$PATH"
export LD_LIBRARY_PATH="$CONDA_PREFIX/lib:$CUDA_HOME/lib64:${LD_LIBRARY_PATH:-}"
export TORCH_CUDA_ARCH_LIST=12.0
export FORCE_CUDA=1

pip install --no-build-isolation -e submodules/diff-gaussian-rasterization
pip install --no-build-isolation -e submodules/simple-knn
pip install --no-build-isolation -e submodules/fused-ssim
```

## Data Preparation

### Mip-NeRF 360 Dataset

Please download the Mip-NeRF 360 dataset processed by colmap from [Mip-NeRF 360](https://jonbarron.info/mipnerf360/), and after unzipping "Dataset Pt. 1" and "Dataset Pt. 2", combine the scenes. Finally, the current directory should contain the following folders:

```
|---Mip-NeRF360
    |---bicycle
    |   |---images
    |   |   |---<image 0>
    |   |   |---<image 1>
    |   |   |---...
    |   |---images_2
    |   |---images_4
    |   |---images_8
    |   |---sparse
    |       |---0
    |           |---cameras.bin
    |           |---images.bin
    |           |---points3D.bin
    |---bonsai
    |---...
```

### Tanks and Temples Dataset

Tanks and Temples is divided into three parts, comprising a total of 21 scenes: Intermediate ('Family', 'Francis', 'Horse', 'Lighthouse', 'M60', 'Panther', 'Playground', 'Train'), Advanced ('Auditorium', 'Ballroom', 'Courtroom', 'Museum', 'Palace', 'Temple'), and Training Data ('Barn', 'Caterpillar', 'Church', 'Courthouse', 'Ignatius', 'Meetingroom', 'Truck').

Please download the  'Train' and 'Truck' scenes from the Tanks and Temples dataset from [here](https://www.tanksandtemples.org/download/).

```
|---Tanks_Temples
    |---Train
    |   |---images
    |   |   |---<image 0>
    |   |   |---<image 1>
    |   |   |---...
    |   |---sparse
    |       |---0
    |           |---cameras.bin
    |           |---images.bin
    |           |---points3D.bin
    |---Truck
    |---...
```



### Deep Blending Dataset

Please download the Deep Blending 360 dataset processed by colmap from [Deep Blending 360](http://visual.cs.ucl.ac.uk/pubs/deepblending/)

```
|---Deep_Blending
    |---drjohnson
    |   |---images
    |   |   |---<image 0>
    |   |   |---<image 1>
    |   |   |---...
    |   |---sparse
    |       |---0
    |           |---cameras.bin
    |           |---images.bin
    |           |---points3D.bin
    |---playroom
    |---...
```

## Training

```bash
python train.py -s <path to the dataset> -m <path to the output path>
```

## Evaluation

Edit the eval.sh to your output path

```bash
bash eval.sh
```

## Pre-trained Models

You can download part of our Pre-trained Models in /output

