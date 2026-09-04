// Simple TypeScript loader that works with newer Node versions
// This file is used by Cucumber to load .ts files

const Module = require('node:module');
const path = require('node:path');
const fs = require('node:fs');

// Map to cache compiled modules
const cache = new Map();

// Try to use esbuild for transpilation (faster and more reliable)
let esbuild;
try {
  esbuild = require('esbuild');
} catch (e) {
  // If esbuild is not available, we'll use a fallback
}

// Intercept require to handle .ts files
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  // Check if it's a TypeScript file
  const resolved = Module._resolveFilename(id, this);
  
  if (resolved.endsWith('.ts')) {
    // Check cache first
    if (cache.has(resolved)) {
      return cache.get(resolved);
    }

    // Read the TypeScript file
    const content = fs.readFileSync(resolved, 'utf-8');
    
    // Transpile using esbuild if available
    if (esbuild) {
      try {
        const result = esbuild.transformSync(content, {
          loader: 'ts',
          target: 'es2020',
          format: 'cjs'
        });
        
        // Evaluate the transpiled code
        const module = { exports: {} };
        const fn = new Function('require', 'module', 'exports', '__filename', '__dirname', result.code);
        fn(require, module, module.exports, resolved, path.dirname(resolved));
        
        // Cache and return
        cache.set(resolved, module.exports);
        return module.exports;
      } catch (e) {
        console.error(`Error transpiling ${resolved}:`, e);
        throw e;
      }
    } else {
      throw new Error(`Cannot load TypeScript file ${resolved}. esbuild is required.`);
    }
  }
  
  return originalRequire.apply(this, arguments);
};

// Also handle ES modules if needed
if (require.extensions) {
  require.extensions['.ts'] = function(module, filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    
    if (esbuild) {
      const result = esbuild.transformSync(content, {
        loader: 'ts',
        target: 'es2020',
        format: 'cjs'
      });
      module._compile(result.code, filename);
    } else {
      throw new Error(`Cannot load TypeScript file ${filename}. esbuild is required.`);
    }
  };
}
