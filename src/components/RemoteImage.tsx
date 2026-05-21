import React, { ComponentProps, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { supabase } from '../lib/supabase';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!path) return;
  //  console.log('Fetching image from Supabase storage with path:', path);
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('products')
        .download(path);

      if (error) {
        console.log(error);
      }

      const filedata= data;

      if (filedata) {
       // console.log('Image data fetched successfully from Supabase storage',filedata);
        const fr = new FileReader();
        fr.readAsDataURL(filedata);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  //console.log(image)
  if (!image) {
    return <Image source={{ uri: fallback }} {...imageProps} />;
  }

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;