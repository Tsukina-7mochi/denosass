import * as posix from "https://deno.land/std@0.181.0/path/mod.ts";

const toPathUrl = function(path) {
  return posix.toFileUrl(posix.resolve(path), posix.resolve(path, Deno.cwd()));
}

/** @type Set<string> */
const readFiles = new Set();

const readFile = function (path) {
  const url = posix.isAbsolute(path) ? toPathUrl(path) : path;

  readFiles.add(path);

  if (isFile(path)) {
    return Deno.readTextFileSync(url);
  } else {
    return '';
  }
}

const isFile = function(path) {
  const url = posix.isAbsolute(path) ? toPathUrl(path) : path;

  try {
    const file = Deno.statSync(url);
    return file.isFile;
  } catch {
    return false;
  }
}

const isDirectory = function (path) {
  const url = posix.isAbsolute(path) ? toPathUrl(path) : path;

  try {
    const file = Deno.statSync(url);
    return file.isDirectory;
  } catch {
    return false;
  }
}

export {
  readFiles,
  readFile,
  isFile,
  isDirectory,
};
