『 🔥 SUPER HIGH CRACK v5.0 - ROBlOX LUA HUB DEOBFUSCATOR 🔥 』

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', () => {
        const inputCode = document.getElementById('inputCode');
        const outputCode = document.getElementById('outputCode');
        const deobfuscateBtn = document.getElementById('deobfuscateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const clearInputBtn = document.getElementById('clearInputBtn');
        const loader = document.getElementById('loader');
        const statusMessage = document.getElementById('statusMessage');
        const statsContainer = document.getElementById('statsContainer');
        
        const lineCount = document.getElementById('lineCount');
        const tableCount = document.getElementById('tableCount');
        const varCount = document.getElementById('varCount');
        const processTime = document.getElementById('processTime');

        『 🔥 MODERN GLASS STYLE 🔥 』
        statusMessage.style.cssText = 'font-size: 13px; font-weight: 500; padding: 10px 14px; border-radius: 14px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.05); transition: all 0.2s ease;';
        statsContainer.style.cssText = 'display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap;';
        
        const statItems = [lineCount, tableCount, varCount, processTime];
        statItems.forEach(el => {
            if (el && el.parentElement) {
                el.parentElement.style.cssText = 'flex: 1; background: rgba(10,10,20,0.6); backdrop-filter: blur(12px); border-radius: 18px; padding: 12px 8px; text-align: center; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s ease;';
            }
        });

        『 🔥 ROBLOX LUA KEYWORDS 🔥 』
        const robloxServices = [
            'Players', 'RunService', 'ReplicatedStorage', 'Workspace', 'Lighting',
            'UserInputService', 'TweenService', 'HttpService', 'TeleportService',
            'MarketplaceService', 'DataStoreService', 'CollectionService'
        ];
        
        const robloxEvents = [
            'PlayerAdded', 'PlayerRemoving', 'CharacterAdded', 'CharacterRemoving',
            'Died', 'HumanoidRootPart', 'Touched', 'Triggered', 'OnServerEvent'
        ];

        『 🔥 SUPER CRACK ENGINE 🔥 』
        const __cache = new Map();
        const __regexCache = new Map();
        
        function getCachedRegex(pattern, flags = 'g') {
            const key = pattern + '|' + flags;
            if (__regexCache.has(key)) return __regexCache.get(key);
            const regex = new RegExp(pattern, flags);
            if (__regexCache.size < 100) __regexCache.set(key, regex);
            return regex;
        }
        
        『 🔥 LAYER 1: STRING DECRYPTION 🔥 』
        function crackStrings(code) {
            let result = code;
            let iteration = 0;
            
            while (iteration < 5) {
                let changed = false;
                
                // string.char(97,98,99) → "abc"
                result = result.replace(getCachedRegex('string\\.char\\(([\\d,\\s]+)\\)'), (match, nums) => {
                    changed = true;
                    const chars = nums.split(',').map(n => String.fromCharCode(parseInt(n.trim())));
                    return `"${chars.join('')}"`;
                });
                
                // string.byte("text", i) → number
                result = result.replace(getCachedRegex('string\\.byte\\(["\']([^"\']+)["\'](?:,\\s*(\\d+))?\\)'), (match, str, pos) => {
                    changed = true;
                    if (pos) return str.charCodeAt(parseInt(pos) - 1).toString();
                    return `{${str.split('').map(c => c.charCodeAt(0)).join(',')}}`;
                });
                
                // loadstring with char patterns
                result = result.replace(getCachedRegex('loadstring\\(([\\["\'])([^\\1]+?)\\1\\)'), (match, quote, content) => {
                    let decrypted = content;
                    decrypted = decrypted.replace(getCachedRegex('string\\.char\\(([\\d,\\s]+)\\)'), (m, nums) => {
                        const chars = nums.split(',').map(n => String.fromCharCode(parseInt(n.trim())));
                        return `"${chars.join('')}"`;
                    });
                    return `loadstring([=[${decrypted}]=])`;
                });
                
                if (!changed) break;
                iteration++;
            }
            
            return result;
        }
        
        『 🔥 LAYER 2: TABLE DECOMPRESSION 🔥 』
        function crackTables(code) {
            let result = code;
            
            // table.concat({...}, sep) → string
            result = result.replace(getCachedRegex('table\\.concat\\(\\{([^}]+)\\},\\s*["\']([^"\']*)["\']\\)'), (match, items, sep) => {
                const parts = [];
                let current = '';
                let inStr = false;
                let strChar = '';
                
                for (let i = 0; i < items.length; i++) {
                    const c = items[i];
                    if ((c === '"' || c === "'") && !inStr) {
                        inStr = true;
                        strChar = c;
                        current = '';
                    } else if (c === strChar && inStr) {
                        inStr = false;
                        parts.push(current);
                    } else if (inStr) {
                        current += c;
                    }
                }
                
                return `"${parts.join(sep)}"`;
            });
            
            // table.insert pattern
            result = result.replace(getCachedRegex('table\\.insert\\(([^,]+),\\s*([^)]+)\\)'), (match, tbl, val) => {
                return `${tbl}[#${tbl}+1] = ${val}`;
            });
            
            return result;
        }
        
        『 🔥 LAYER 3: NUMBER DE-OBFUSCATION 🔥 』
        function crackNumbers(code) {
            let result = code;
            
            // bit32.bxor
            result = result.replace(getCachedRegex('bit32\\.bxor\\((\\d+),\\s*(\\d+)\\)'), (match, a, b) => {
                return (parseInt(a) ^ parseInt(b)).toString();
            });
            
            // Hex values
            result = result.replace(getCachedRegex('0x([0-9A-Fa-f]+)'), (match, hex) => {
                return parseInt(hex, 16).toString();
            });
            
            // Simple math obfuscation
            result = result.replace(getCachedRegex('\\((\\d+)\\s*[+]\\s*(\\d+)\\s*[-]\\s*(\\d+)\\)'), (match, a, b, c) => {
                return (parseInt(a) + parseInt(b) - parseInt(c)).toString();
            });
            
            return result;
        }
        
        『 🔥 LAYER 4: VARIABLE RENAMING 🔥 』
        function crackVariables(code) {
            let result = code;
            const varMap = new Map();
            let counter = 1;
            
            const localPattern = getCachedRegex('\\blocal\\s+([a-zA-Z_][a-zA-Z0-9_]*)', 'g');
            let match;
            
            while ((match = localPattern.exec(code)) !== null) {
                const name = match[1];
                if (/^v\d+$|^_+$|^[a-z]$|^temp/i.test(name) && !varMap.has(name)) {
                    varMap.set(name, `_${counter++}`);
                }
            }
            
            varMap.forEach((newName, oldName) => {
                result = result.replace(getCachedRegex(`\\b${oldName}\\b`, 'g'), newName);
            });
            
            return result;
        }
        
        『 🔥 LAYER 5: ROBlOX SPECIFIC CLEANUP 🔥 』
        function crackRobloxSpecific(code) {
            let result = code;
            
            // Clean up common Roblox patterns
            result = result.replace(/game:GetService\(["']([^"']+)["']\)/g, '$1');
            result = result.replace(/Instance\.new\(["']([^"']+)["']\)/g, '$1.new()');
            
            // Fix common obfuscated patterns
            result = result.replace(/local\s+_G\s*=\s*_G/g, '-- _G reference');
            result = result.replace(/getfenv\(\)/g, 'getfenv()');
            result = result.replace(/setfenv\(/g, 'setfenv(');
            
            return result;
        }
        
        『 🔥 MAIN CRACK EXECUTION 🔥 』
        deobfuscateBtn.addEventListener('click', () => {
            const rawCode = inputCode.value.trim();
            
            if (!rawCode) {
                showStatus('✧ INPUT KODE DULU BANG ✧', 'error');
                outputCode.value = '';
                return;
            }
            
            loader.style.display = 'block';
            deobfuscateBtn.disabled = true;
            statsContainer.style.display = 'none';
            
            const startTime = performance.now();
            
            setTimeout(() => {
                try {
                    showStatus('⚡ LAYER 1/5 - STRING CRACK...', 'info');
                    let cracked = crackStrings(rawCode);
                    
                    showStatus('📦 LAYER 2/5 - TABLE DECOMPRESS...', 'info');
                    cracked = crackTables(cracked);
                    
                    showStatus('🔢 LAYER 3/5 - NUMBER DECODE...', 'info');
                    cracked = crackNumbers(cracked);
                    
                    showStatus('✏️ LAYER 4/5 - VARIABLE CLEAN...', 'info');
                    cracked = crackVariables(cracked);
                    
                    showStatus('🎮 LAYER 5/5 - ROBlOX OPTIMIZE...', 'info');
                    cracked = crackRobloxSpecific(cracked);
                    
                    showStatus('✨ FINAL TOUCH...', 'info');
                    
                    // Clean formatting
                    cracked = cracked.replace(/\n\s*\n\s*\n/g, '\n\n');
                    cracked = cracked.replace(/[ \t]+$/gm, '');
                    
                    const header = `--━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--   XYROOXELLZ ULTRA CRACK v5.0
--   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--   ▶ RAW: ${rawCode.length.toLocaleString()} chars
--   ▶ FINAL: ${cracked.length.toLocaleString()} chars
--   ▶ CLEAN: ${Math.round((1 - cracked.length/rawCode.length) * 100)}% reduction
--   ▶ METHOD: 5-LAYER DEEP CRACK
--━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
                    
                    outputCode.value = header + cracked;
                    
                    const elapsed = performance.now() - startTime;
                    updateStats(rawCode, cracked, elapsed);
                    statsContainer.style.display = 'flex';
                    
                    showStatus('✓ CRACK SUCCESS! CODE READY', 'success');
                    
                } catch (err) {
                    outputCode.value = `-- CRACK FAILED\n-- Error: ${err.message}\n\n-- Raw code:\n${rawCode.slice(0, 1500)}`;
                    showStatus('✗ CRACK GAGAL! CEK KODE LO', 'error');
                } finally {
                    loader.style.display = 'none';
                    deobfuscateBtn.disabled = false;
                }
            }, 16);
        });
        
        function updateStats(raw, cracked, elapsed) {
            const rawLines = raw.split('\n').length;
            const crackedLines = cracked.split('\n').length;
            lineCount.textContent = `${crackedLines} › ${rawLines}`;
            
            const tablesFound = (cracked.match(/\{[\s\S]*?\}/g) || []).length;
            tableCount.textContent = `${tablesFound}`;
            
            const varsFound = (cracked.match(/\b_\d+\b/g) || []).length;
            varCount.textContent = `${varsFound}`;
            
            processTime.textContent = `${(elapsed / 1000).toFixed(2)}s`;
        }
        
        function showStatus(msg, type = 'info') {
            statusMessage.textContent = msg;
            statusMessage.classList.remove('error', 'success', 'info');
            
            const styles = {
                error: { bg: 'rgba(243,139,168,0.12)', color: '#f38ba8', border: '1px solid rgba(243,139,168,0.3)' },
                success: { bg: 'rgba(166,227,161,0.1)', color: '#a6e3a1', border: '1px solid rgba(166,227,161,0.3)' },
                info: { bg: 'rgba(137,220,235,0.08)', color: '#89dceb', border: '1px solid rgba(137,220,235,0.2)' }
            };
            
            const s = styles[type];
            statusMessage.style.background = s.bg;
            statusMessage.style.color = s.color;
            statusMessage.style.border = s.border;
            statusMessage.classList.add(type);
        }
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(outputCode.value);
                const orig = copyBtn.textContent;
                copyBtn.textContent = '✓ COPIED';
                setTimeout(() => copyBtn.textContent = orig, 1500);
            } catch(e) {
                outputCode.select();
                document.execCommand('copy');
                const orig = copyBtn.textContent;
                copyBtn.textContent = '✓ COPIED';
                setTimeout(() => copyBtn.textContent = orig, 1500);
            }
        });
        
        clearInputBtn.addEventListener('click', () => {
            inputCode.value = '';
            outputCode.value = '';
            statsContainer.style.display = 'none';
            showStatus('✧ CLEARED - READY FOR NEXT SCRIPT ✧', 'info');
            inputCode.focus();
        });
        
        inputCode.addEventListener('input', () => {
            const len = inputCode.value.length;
            const lines = inputCode.value.split('\n').length;
            const counter = document.getElementById('inputStats');
            if (counter) counter.textContent = `${len.toLocaleString()} chars · ${lines} lines`;
        });
        
        const statsBadge = document.createElement('div');
        statsBadge.id = 'inputStats';
        statsBadge.style.cssText = 'position: absolute; bottom: 12px; right: 16px; font-size: 11px; color: #6c7086; background: rgba(0,0,0,0.5); padding: 4px 12px; border-radius: 20px; backdrop-filter: blur(8px); letter-spacing: 0.3px;';
        const inputSection = document.querySelector('.input-section');
        if (inputSection) {
            inputSection.style.position = 'relative';
            inputSection.appendChild(statsBadge);
        }
    });
})();