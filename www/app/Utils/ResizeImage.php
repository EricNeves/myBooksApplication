<?php

namespace App\Utils;

class ResizeImage
{
    public static function resize($image, $withImage)
    {
        $base64Image = preg_replace('#^data:image/[^;]+;base64,#', '', $image);

        $imageData = base64_decode($base64Image);

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $imageType = $finfo->buffer($imageData);

        if (in_array($imageType, ['image/png'])) {

            [$originalWidth, $originalHeight] = getimagesizefromstring($imageData);

            $width = $withImage;
            $height = ($originalHeight / $originalWidth) * $width;

            $image = imagecreatefromstring($imageData);

            if (!$image) {
                return ['error' => 'Invalid file format - Accept: PNG'];
            }

            $newImage = imagecreatetruecolor($width, $height);

            imagecopyresampled($newImage, $image, 0, 0, 0, 0, $width, $height, $originalWidth, $originalHeight);

            imagedestroy($image);
            imagedestroy($newImage);

            ob_start();
            imagepng($newImage, null, 9);
            $result = ob_get_clean();

            return ['image' => 'data:image/png;base64,' . base64_encode($result)];
        } else {
            return ['error' => 'Invalid file format - Accept: PNG'];
        }
    }
}