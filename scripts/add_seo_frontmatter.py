import sys, os, re

def slug_to_title(path):
    name = os.path.basename(path)
    name = re.sub(r'\.mdx$', '', name)
    name = name.replace('-', ' ')
    return name.title()

def parse_frontmatter(lines):
    fm = {}
    for line in lines:
        if ':' in line:
            key, value = line.split(':', 1)
            fm[key.strip()] = value.strip().strip('"')
    return fm

def dump_frontmatter(fm):
    out = []
    for k, v in fm.items():
        out.append(f"{k}: {v}")
    return out

def extract_heading(lines):
    for line in lines:
        m = re.match(r'^#+\s+(.*)', line)
        if m:
            return m.group(1).strip()
    return None

def extract_description(lines):
    desc_parts = []
    capture = False
    for line in lines:
        text = line.strip()
        if not text:
            if capture:
                break
            else:
                continue
        if text.startswith('#') or text.startswith('!['):
            if capture:
                break
            continue
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'[`*_#<>]', '', text)
        desc_parts.append(text)
        if text.endswith('.'):
            break
        capture = True
    if desc_parts:
        return ' '.join(desc_parts)
    return None

def process(path):
    with open(path, 'r') as f:
        lines = f.read().splitlines()
    if lines and lines[0].strip() == '---':
        # existing frontmatter
        end = 1
        while end < len(lines) and lines[end].strip() != '---':
            end += 1
        fm_lines = lines[1:end]
        body = lines[end+1:]
        fm = parse_frontmatter(fm_lines)
        changed = False
        title = fm.get('title') or extract_heading(body) or slug_to_title(path)
        if 'title' not in fm:
            fm['title'] = title
            changed = True
        desc = fm.get('description') or extract_description(body)
        if not desc:
            desc = f"Information about {title}."
        if 'description' not in fm:
            fm['description'] = desc
            changed = True
        if changed:
            new_fm = dump_frontmatter(fm)
            new_lines = ['---'] + new_fm + ['---'] + body
            with open(path, 'w') as f:
                f.write('\n'.join(new_lines) + '\n')
    else:
        body = lines
        title = extract_heading(body) or slug_to_title(path)
        desc = extract_description(body) or f"Information about {title}."
        fm = {'title': title, 'description': desc}
        fm_lines = dump_frontmatter(fm)
        new_lines = ['---'] + fm_lines + ['---'] + body
        with open(path, 'w') as f:
            f.write('\n'.join(new_lines) + '\n')

if __name__ == '__main__':
    for p in sys.argv[1:]:
        process(p)
