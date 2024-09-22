# ScreenFlow

ScreenFlow is a simple React application built with Chakra UI that allows you to upload an image and receive the bounding box coordinates of desktop icons on the computer. This project serves as a proof of concept (POC) for a computer vision model that detects desktop icons, potentially enabling an AI or robot to visually navigate and operate a desktop computer.

## Project Overview

This project was a fun exercise in applying computer vision techniques to a unique problem—detecting and localizing desktop icons across different operating systems. The model was trained on a small dataset containing image data from macOS, Windows, and Linux desktops. The goal was to detect and generate bounding box coordinates for three specific desktop icons:
- **Google Chrome**
- **Spotify**
- **Discord**

## Dataset

The dataset used for training consisted of 38 images:
- **27 images** for training
- **7 images** for validation
- **4 images** for testing

The dataset was gathered from multiple operating systems, and while it was small, it provided a good starting point for the model. There are certainly opportunities to improve the dataset by adding more data, removing noisy data, and applying augmentations to create a more robust model.

## Model Training

The labeling and training of the model were performed using **Roboflow**, a powerful tool for managing datasets and training computer vision models. Roboflow's intuitive interface made it easy to annotate the images and deploy a model quickly.

## Model Performance

The model was evaluated on the test set, achieving the following benchmarks:

- ![mAP](https://via.placeholder.com/15/8b5cf6/8b5cf6.png) **mAP**: 98.9%
- ![Precision](https://via.placeholder.com/15/38bdf8/38bdf8.png) **Precision**: 93.0%
- ![Recall](https://via.placeholder.com/15/f59e0b/f59e0b.png) **Recall**: 93.1%

These results demonstrate the model's potential, although further optimizations and dataset improvements could enhance its performance.

## Usage

To use ScreenFlow, simply upload an image of a desktop, and the application will return the bounding box coordinates of the detected desktop icons. This functionality could be a step towards enabling AI or robots to interact with desktop environments visually.

## Future Work

While this project was a successful proof of concept, there is room for improvement:
- **Expand the Dataset**: Collect more images from various desktop environments to improve model robustness.
- **Data Augmentation**: Apply techniques such as rotation, flipping, and scaling to create a more diverse training set.
- **Noise Reduction**: Filter out noisy data to improve model accuracy and reliability.

## Conclusion

ScreenFlow was a fun project that showcases the potential of computer vision in desktop environments. By detecting and localizing desktop icons, this POC lays the groundwork for more advanced applications, such as AI-driven desktop navigation and automation.

## Acknowledgments

This project was developed using **Roboflow 3.0 Object Detection** as the base model for labeling, dataset management, and model training.